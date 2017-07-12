'use strict';

const Events = require('events');
const Flatten = require('lodash.flatten');
const Triton = require('triton');
const VAsync = require('vasync');
const Wreck = require('wreck');
const CIDRMatcher = require('cidr-matcher');
const ForceArray = require('force-array');
const Get = require('lodash.get');
const Uniq = require('lodash.uniq');
const Queue = require('./queue');

module.exports = class ContainerPilotWatcher extends Events {
  constructor (options) {
    super();

    options = options || {};

    // todo assert options
    this._data = options.data;
    this._frequency = options.frequency || 1000;

    Triton.createClient({
      profile: {
        url: options.url || process.env.SDC_URL,
        account: options.account || process.env.SDC_ACCOUNT,
        keyId: options.keyId || process.env.SDC_KEY_ID
      }
    }, (err, client) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this._triton = client.cloudapi;
    });
  }

  poll () {
    if (this._timeoutId) {
      return;
    }

    this._timeoutId = setTimeout(() => {
      this.check((err) => {
        if (err) {
          this.emit('error', err);
        }

        delete this._timeoutId;
        this.poll();
      });
    }, this._frequency);
  }

  _getDeploymentGroups (cb) {
    const getInstances = (service, next) => {
      service.instances({}, (err, instances) => {
        if (err) {
          return next(err);
        }

        next(null, Object.assign({}, service, {
          instances
        }));
      });
    };

    const getServices = (deploymentGroup, next) => {
      deploymentGroup.services({}, (err, services) => {
        if (err) {
          return next(err);
        }

        if (!services || !services.length) {
          return next();
        }

        VAsync.forEachParallel({
          inputs: services,
          func: getInstances
        }, (err, result) => {
          if (err) {
            return next(err);
          }

          next(null, Object.assign({}, deploymentGroup, {
            services: result.successes
          }));
        });
      });
    };

    const handleDeploymentGroups = (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      VAsync.forEachParallel({
        inputs: deploymentGroups,
        func: getServices
      }, (err, result) => {
        cb(err, result.successes);
      });
    };

    const getDeploymentGroups = (err, portal) => {
      if (err) {
        return cb(err);
      }

      portal.deploymentGroups({}, handleDeploymentGroups);
    };

    this._data.getPortal({}, getDeploymentGroups);
  }

  _getNetworks (networkIds = [], cb) {
    VAsync.forEachParallel({
      inputs: networkIds,
      func: (id, next) => {
        this._triton.getNetwork(id, next);
      }
    }, (err, results) => {
      cb(err, ForceArray((results || {}).successes));
    });
  }

  _getPublicIps (machine, cb) {
    this._getNetworks(machine.networks, (err, networks) => {
      if (err) {
        return cb(err);
      }

      const privateNetworkSubnets = networks
        .filter((network) => {
          return !network['public'];
        })
        .map((network) => {
          return network.subnet;
        })
        .filter(Boolean);

      const cidr = new CIDRMatcher(privateNetworkSubnets);

      const nonPrivateIps = machine.ips.filter((ip) => {
        return !cidr.contains(ip);
      });

      cb(null, nonPrivateIps);
    });
  }

  _fetchInstanceStatus (instance, cb) {
    const { machineId } = instance;

    const handleStatuses = (err, results) => {
      if (err) {
        this.emit('error', err);
        return cb();
      }

      const statuses = ForceArray((results || {}).successes);

      const status = statuses.filter(Boolean).shift();

      if (!status) {
        return cb(null, instance);
      }

      const services = ForceArray(status.Services).filter(({ Name }) => {
        return Name !== 'containerpilot';
      });

      cb(null, Object.assign({}, instance, {
        cp: Object.assign({}, status, {
          Services: services
        })
      }));
    };

    const fetchStatus = (ip, next) => {
      Wreck.get(`http://${ip}:9090/status`, {
        timeout: 1000 // 1s
      }, (err, res, payload) => {
        if (err) {
          this.emit('error', err);
          return next();
        }

        if (Buffer.isBuffer(payload)) {
          payload = payload.toString();
        }

        try {
          const status = JSON.parse(payload);
          next(null, status);
        } catch (err) {
          next();
        }
      });
    };

    const handlePublicIps = (err, ips) => {
      if (err) {
        this.emit('error', err);
        return cb();
      }

      VAsync.forEachParallel({
        inputs: ips,
        func: fetchStatus
      }, handleStatuses);
    };

    this._triton.getMachine(machineId, (err, machine) => {
      if (err) {
        this.emit('error', err);
        return cb();
      }

      this._getPublicIps(machine, handlePublicIps);
    });
  }

  _fetchServiceStatus (service, cb) {
    VAsync.forEachParallel({
      inputs: service.instances,
      func: (instance, next) => {
        this._fetchInstanceStatus(instance, next);
      }
    }, (err, results) => {
      if (err) {
        this.emit('error', err);
      }

      cb(null, Object.assign({}, service, {
        instances: ForceArray((results || {}).successes)
      }));
    });
  }

  _fetchDeploymentGroupStatus (dg, cb) {
    if (!dg || !dg.services || !dg.services.length) {
      return cb();
    }

    VAsync.forEachParallel({
      inputs: dg.services,
      func: (service, next) => {
        this._fetchServiceStatus(service, next);
      }
    }, (err, results) => {
      if (err) {
        this.emit('error', err);
      }

      cb(null, Object.assign({}, dg, {
        services: ForceArray((results || {}).successes)
      }));
    });
  }

  _saveInstance ({ id, healthy, watchers, jobs }, cb) {
    if (!id) {
      return cb();
    }

    this._data.updateInstance({
      id,
      healthy,
      watchers,
      jobs
    }, cb);
  }

  _saveService ({ id, instances, connections }, cb) {
    if (!id) {
      return cb();
    }

    VAsync.forEachParallel({
      inputs: instances,
      func: (instance, next) => {
        this._saveInstance(instance, next);
      }
    }, (err) => {
      if (err) {
        return cb(err);
      }

      this._data.updateService({
        id,
        connections
      }, cb);
    });
  }

  _saveDeploymentGroup (dg, cb) {
    VAsync.forEachParallel({
      inputs: dg.services,
      func: (service, next) => {
        this._saveService(service, next);
      }
    }, cb);
  }

  check (cb) {
    if (!this._triton) {
      return cb();
    }

    const resolveServiceConnections = ({ services, service }) => {
      const watches = Uniq(
        Flatten(ForceArray(service.instances).map(({ watches }) => { return watches; }))
      );

      return watches
        .map((jobName) => {
          return services.reduce((serviceId, service) => {
            if (serviceId) {
              return serviceId;
            }

            const thisServiceJobs = Uniq(
              Flatten(ForceArray(service.instances).map(({ jobs }) => { return jobs; }))
            );

            if (thisServiceJobs.indexOf(jobName) >= 0) {
              return service.id;
            }

            return serviceId;
          }, null);
        })
        .filter(Boolean);
    };

    const resolveInstanceHealth = ({ name }, instance) => {
      if (!instance) {
        return;
      }

      if (!instance.cp) {
        return 'UNAVAILABLE';
      }

      const jobNames = Get(instance, 'cp.Services');

      const serviceJobs = jobNames.filter(({ Name }) => { return Name === name; });

      if (serviceJobs.length) {
        return serviceJobs.shift().Status.toUpperCase();
      }

      const almostJobNameRegexp = new RegExp(`${name}-.*`);
      const almostServiceJobs = jobNames.filter((n) => {
        return almostJobNameRegexp.test(n);
      });

      if (almostServiceJobs.length) {
        return almostServiceJobs.shift().Status.toUpperCase();
      }

      return 'UNKNOWN';
    };

    const handleStatuses = (err, results) => {
      if (err) {
        this.emit('error', err);
      }

      const dgs = ForceArray((results || {}).successes)
        .filter(Boolean)
        .map((dg) => {
          return Object.assign({}, dg, {
            services: ForceArray(dg.services).map((service) => {
              return Object.assign({}, service, {
                instances: ForceArray(service.instances).map((instance) => {
                  return Object.assign({}, instance, {
                    healthy: resolveInstanceHealth(service, instance),
                    jobs: Get(instance, 'cp.Services', []).map(
                      ({ Name }) => { return Name; }
                    ),
                    watches: Get(instance, 'cp.Watches', [])
                  });
                })
              });
            })
          });
        })
        .map((dg) => {
          return Object.assign({}, dg, {
            services: ForceArray(dg.services).map((service) => {
              return Object.assign({}, service, {
                connections: resolveServiceConnections({
                  services: dg.services,
                  service
                })
              });
            })
          });
        });

      VAsync.forEachParallel({
        inputs: dgs,
        func: (dg, next) => {
          Queue(dg.id, () => {
            return new Promise((resolve) => {
              this._saveDeploymentGroup(dg, (err) => {
                resolve();
                next(err);
              });
            });
          });
        }
      }, cb);
    };

    const fetchStatuses = (err, dgs) => {
      if (err) {
        this.emit('error', err);
        return cb();
      }

      VAsync.forEachParallel({
        inputs: dgs,
        func: (dg, next) => {
          this._fetchDeploymentGroupStatus(dg, next);
        }
      }, handleStatuses);
    };

    this._getDeploymentGroups(fetchStatuses);
  }
};

