'use strict';

// const Assert = require('assert');
const TritonWatch = require('triton-watch');
const Get = require('lodash.get');
const Find = require('lodash.find');
const Boom = require('boom');
const Util = require('util');
const ForceArray = require('force-array');
const VAsync = require('vasync');
const Queue = require('./queue');


const DEPLOYMENT_GROUP = 'docker:label:com.docker.compose.project';
const SERVICE = 'docker:label:com.docker.compose.service';
const HASH = 'docker:label:com.docker.compose.config-hash';

const ACTION_REMOVE_STATUSES = [
  'STOPPING',
  'STOPPED',
  'OFFLINE',
  'DELETED',
  'DESTROYED',
  'FAILED',
  'INCOMPLETE',
  'UNKNOWN'
];

const ACTION_CREATE_STATUSES = [
  'READY',
  'ACTIVE',
  'RUNNING',
  'STOPPED',
  'OFFLINE',
  'FAILED',
  'INCOMPLETE',
  'UNKNOWN'
];

const SERVICE_STOPPING_STATUSES = [
  'STOPPED',
  'OFFLINE',
  'FAILED',
  'INCOMPLETE',
  'UNKNOWN'
];

const SERVICE_DELETING_STATUSES = [
  'DELETED',
  'DESTROYED',
  'FAILED',
  'INCOMPLETE',
  'UNKNOWN'
];

const isNotFound = (err) => {
  return err && (err['typeof'] === Boom.notFound);
};

module.exports = class MachineWatcher {
  constructor (options) {
    options = options || {};

    // todo assert options
    this._data = options.data;
    this._server = options.watch;
    this._frequency = 200;

    this._tritonWatch = new TritonWatch({
      frequency: this._frequency,
      triton: {
        profile: {
          url: options.url || process.env.SDC_URL,
          account: options.account || process.env.SDC_ACCOUNT,
          keyId: options.keyId || process.env.SDC_KEY_ID
        }
      }
    });

    this._waitingForPlan = [];
    this._isTritonWatchPolling = false;

    this._tritonWatch.on('change', (machine) => {
      return this.onChange(machine);
    });

    this._tritonWatch.on('all', (machines) => {
      machines.forEach((machine) => {
        this.onChange(machine);
      });
    });
  }

  poll () {
    if (!this._isTritonWatchPolling) {
      this._tritonWatch.poll();
      this._isTritonWatchPolling = true;
    }

    if (this._isWaitingPolling) {
      return;
    }

    this._isWaitingPolling = true;

    setTimeout(() => {
      this._isWaitingPolling = false;
      this._checkForWaiting();
    }, this._frequency);
  }

  _checkForWaiting () {
    this._waitingForPlan.forEach(this.onChange);
  }

  getContainers () {
    return this._tritonWatch.getContainers();
  }

  getDeploymentGroup (name, cb) {
    this._data.getDeploymentGroup({ name }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      return cb(null, deploymentGroup);
    });
  }

  getService ({ serviceName, deploymentGroupId }, cb) {
    this._data.getServices({ name: serviceName, deploymentGroupId }, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.pop());
    });
  }

  getInstances (service, cb) {
    service.instances()
      .then((instances) => {
        return cb(null, instances);
      })
      .catch((err) => {
        return cb(err);
      });
  }

  getVersion (deploymentGroup, cb) {
    deploymentGroup.version()
      .then((version) => {
        return cb(null, version);
      })
      .catch((err) => {
        return cb(err);
      });
  }

  createInstance ({ deploymentGroup, machine, instances, service }, cb) {
    this._server.log(['debug', 'error'], `-> detected that machine ${machine.name} was created`);

    const status = (machine.state || '').toUpperCase();

    if (status === 'DELETED') {
      return cb();
    }

    const instance = {
      name: machine.name,
      status,
      deploymentGroupId: deploymentGroup.id,
      machineId: machine.id
    };

    this._server.log(['debug'], '-> creating instance', Util.inspect(instance));
    this._data.createInstance(instance, (err, instance) => {
      if (err) {
        return cb(err);
      }

      const payload = {
        id: service.id,
        instances: instances.concat(instance)
      };

      this._server.log(['debug'], '-> updating service', Util.inspect(payload));
      this._data.updateService(payload, cb);
    });
  }

  updateInstance ({ machine, instance, instances, service }, cb) {
    console.error(`-> detected that machine ${machine.name} was updated`);

    const updatedInstance = {
      id: instance.id,
      status: (machine.state || '').toUpperCase()
    };

    this._server.log(['debug'], '-> updating instance', Util.inspect(updatedInstance));
    this._data.updateInstance(updatedInstance, (err) => {
      if (err) {
        return cb(err);
      }

      if (['DELETED', 'DESTROYED'].indexOf(machine.state.toUpperCase()) < 0) {
        return cb();
      }


      const payload = {
        id: service.id,
        instances: instances.filter(({ id }) => {
          return id !== instance.id;
        })
      };

      this._server.log(['debug'], '-> updating service', Util.inspect(payload));
      this._data.updateService(payload, cb);
    });
  }

  resolveChange ({ deploymentGroup, version, service, instances, machine }, cb) {
    console.error(`-> resolving change for machine ${machine.name}`);

    const SERVICE_STATUS = Get(service, 'status', 'UNKNOWN').toUpperCase();
    const MACHINE_STATUS = Get(machine, 'state', 'UNKNOWN').toUpperCase();

    const hasPlan = Boolean(Get(version, 'plan.hasPlan', true));
    const serviceName = service.name;

    console.error(`-> detected meta for machine ${machine.name} ${Util.inspect({
      SERVICE_STATUS,
      MACHINE_STATUS,
      hasPlan,
      serviceName
    })}`);

    const ActionResolvers = {
      '_CREATE_OR_REMOVE': (action, cb) => {
        console.error(`-> got _CREATE_OR_REMOVE action for "${machine.name}"`);

        let processed = ForceArray(action.processed);
        const completed = processed.length === action.toProcess;

        if (completed) {
          console.error('-> action was already completed');
          return cb(null, {
            action,
            completed: true
          });
        }

        if (processed.indexOf(machine.id) >= 0) {
          console.error('-> machine was already processed');
          return cb(null, {
            action,
            completed
          });
        }

        processed = processed.concat([machine.id]);

        cb(null, {
          action: Object.assign({}, action, {
            processed
          }),
          completed: processed.length === action.toProcess
        });
      },
      'NOOP': (action, cb) => {
        console.error(`-> got NOOP action for "${machine.name}"`);

        cb(null, {
          action,
          completed: true
        });
      },
      // scenarios: scale down or removed service
      // so far, the logic is the same for CREATE and REMOVE
      'REMOVE': (action, cb) => {
        console.error(`-> got REMOVE action for "${machine.name}"`);

        if (ACTION_REMOVE_STATUSES.indexOf(MACHINE_STATUS) < 0) {
          console.error(`-> since "${machine.name}" is "${MACHINE_STATUS}", nothing to do here`);

          return cb(null, {
            action,
            completed: false
          });
        }

        if (action.machines.indexOf(machine.id) < 0) {
          console.error(`-> since "${machine.name}" didn't exist, no need to process its removal`);
          return cb(null, {
            action,
            completed: false
          });
        }

        ActionResolvers._CREATE_OR_REMOVE(action, cb);
      },
      // scenarios: scale up, recreate, create
      // so far, the logic is the same for CREATE and REMOVE
      'CREATE': (action, cb) => {
        console.error(`-> got CREATE action for "${machine.name}"`);

        if (ACTION_CREATE_STATUSES.indexOf(MACHINE_STATUS) < 0) {
          console.error(`-> since "${machine.name}" is "${MACHINE_STATUS}", nothing to do here`);

          return cb(null, {
            action,
            completed: false
          });
        }

        if (action.machines.indexOf(machine.id) >= 0) {
          console.error(`-> since "${machine.name}" already existed, no need to process its creation`);
          return cb(null, {
            action,
            completed: false
          });
        }

        ActionResolvers._CREATE_OR_REMOVE(action, cb);
      },
      'START': (action, cb) => {
        console.error(`-> got START action for "${machine.name}". redirecting`);
        return ActionResolvers.NOOP(action, cb);
      }
    };

    const toBeActiveServiceResolver = (cb) => {
      VAsync.forEachParallel({
        inputs: version.plan,
        func: (action, next) => {
          if (action.service !== serviceName) {
            return next(null, {
              action
            });
          }

          const ACTION_TYPE = Get(action, 'type', 'NOOP').toUpperCase();
          ActionResolvers[ACTION_TYPE](action, next);
        }
      }, (err, result) => {
        if (err) {
          return cb(err);
        }

        const newActions = ForceArray(result.successes);

        console.error(`-> got new actions for "${service.name}" ${Util.inspect(newActions)}`);

        const newServiceActions = newActions.filter(({ action }) => {
          return action.service === serviceName;
        });

        const isCompleted = newServiceActions.every(({ completed }) => {
          return completed;
        });

        console.error(`-> are all actions for "${service.name}" completed? ${isCompleted}`);

        const newPlan = newActions.map(({ action }) => {
          return action;
        });

        VAsync.parallel({
          funcs: [
            (cb) => {
              console.error(`-> updating Version ${version.id} with new plan ${Util.inspect(newPlan)}`);

              this._data.updateVersion({
                id: version.id,
                plan: newPlan
              }, cb);
            },
            (cb) => {
              if (!isCompleted) {
                return cb();
              }

              console.error(`-> updating Service ${service.name} with new status: ACTIVE`);

              return this._data.updateService({
                id: service.id,
                status: 'ACTIVE'
              }, cb);
            }
          ]
        }, cb);
      });
    };

    const ServiceResolvers = {
      'ACTIVE': (cb) => {
        console.error(`-> got ACTIVE service "${service.name}". nothing to do`);

        cb();
      },
      'PROVISIONING': (cb) => {
        console.error(`-> got PROVISIONING service "${service.name}"`);

        toBeActiveServiceResolver(cb);
      },
      'SCALING': (cb) => {
        console.error(`-> got SCALING service "${service.name}"`);

        toBeActiveServiceResolver(cb);
      },
      'STOPPING': (cb) => {
        console.error(`-> got STOPPING service "${service.name}"`);

        if (SERVICE_STOPPING_STATUSES.indexOf(MACHINE_STATUS) < 0) {
          return cb();
        }

        const isComplete = instances
          .filter(({ machineId }) => {
            return machineId !== machine.id;
          })
          .every(({ status }) => {
            return SERVICE_STOPPING_STATUSES.indexOf(status) >= 0;
          });

        if (!isComplete) {
          return cb();
        }

        this._data.updateService({
          id: service.id,
          status: 'STOPPED'
        }, cb);
      },
      'STOPPED': (cb) => {
        return ServiceResolvers.ACTIVE(cb);
      },
      'DELETING': (cb) => {
        console.error(`-> got DELETING service "${service.name}"`);

        if (SERVICE_DELETING_STATUSES.indexOf(MACHINE_STATUS) < 0) {
          return cb();
        }

        const isComplete = instances
          .filter(({ machineId }) => {
            return machineId !== machine.id;
          })
          .every(({ status }) => {
            return SERVICE_DELETING_STATUSES.indexOf(status) >= 0;
          });

        if (!isComplete) {
          return cb();
        }

        VAsync.parallel({
          funcs: [
            (cb) => {
              console.error(`-> updating Service ${service.name} to set it DELETED`);

              this._data.updateService({
                id: service.id,
                status: 'DELETED'
              }, cb);
            },
            (cb) => {
              console.error(`-> updating DeploymentGroup ${deploymentGroup.id} to remove Service ${service.name}`);

              deploymentGroup.services({}, (err, services) => {
                if (err) {
                  return cb(err);
                }

                this._data.updateDeploymentGroup({
                  id: deploymentGroup.id,
                  services: services.filter(({ id }) => {
                    return service.id !== id;
                  })
                }, cb);
              });
            }
          ]
        }, cb);
      },
      'DELETED': (cb) => {
        return ServiceResolvers.ACTIVE(cb);
      },
      'RESTARTING': (cb) => {
        return ServiceResolvers.ACTIVE(cb);
      },
      'UNKNOWN': (cb) => {
        return ServiceResolvers.ACTIVE(cb);
      }
    };

    const instance = Find(instances, ['machineId', machine.id]);

    const isNew = instances
      .every(({ machineId }) => {
        return machine.id !== machineId;
      });

    const handleCreateOrUpdatedInstance = (err) => {
      if (err) {
        return cb(err);
      }

      console.error(`-> created/updated machine ${machine.name}`);

      if (!hasPlan) {
        console.error(`-> plan for ${service.name} is still not available. queuing`);
        this._waitingForPlan.push(machine);
        return cb();
      }

      const serviceResolver = ServiceResolvers[SERVICE_STATUS] ?
        ServiceResolvers[SERVICE_STATUS] :
        ServiceResolvers.UNKNOWN;

      serviceResolver(cb);
    };

    const createOrUpdateInstance = isNew ?
      this.createInstance :
      this.updateInstance;

    createOrUpdateInstance.call(this, {
      deploymentGroup,
      machine,
      instances,
      instance,
      service
    }, handleCreateOrUpdatedInstance);
  }

  onChange (machine) {
    if (!machine) {
      console.error('-> `change` event received without machine data');
      return;
    }

    // console.log('-> `change` event received', Util.inspect(machine));

    const { id, tags = {} } = machine;

    // assert id existence
    if (!id) {
      console.error('-> `change` event received for a machine without `id`');
      return;
    }

    // assert that it's a docker-compose project
    const isCompose = [DEPLOYMENT_GROUP, SERVICE, HASH].every(
      (name) => {
        return tags[name];
      }
    );

    if (!isCompose) {
      console.error(`-> Changed machine ${id} was not provisioned by docker-compose`);
      return;
    }

    const deploymentGroupName = tags[DEPLOYMENT_GROUP];
    const serviceName = tags[SERVICE];

    const getInstancesAndVersion = ({
      service,
      deploymentGroup
    }, cb) => {
      this.getInstances(service, (err, instances = []) => {
        if (err && !isNotFound(err)) {
          return cb(err);
        }

        this.getVersion(deploymentGroup, (err, version) => {
          if (err) {
            return cb(err);
          }

          this.resolveChange({
            deploymentGroup,
            version,
            service,
            instances,
            machine
          }, cb);
        });
      });
    };

    // assert that service exists
    const assertService = (deploymentGroup, cb) => {
      this.getService({
        serviceName,
        deploymentGroupId: deploymentGroup.id
      }, (err, service) => {
        if (isNotFound(err) || !service) {
          console.error(`Service "${serviceName}" form DeploymentGroup "${deploymentGroupName}" for machine ${id} not found`);
          return cb();
        }

        if (err) {
          return cb(err);
        }

        getInstancesAndVersion({
          service,
          deploymentGroup
        }, cb);
      });
    };

    // assert that project managed by this portal
    // also, lock into `deploymentGroupId` queue
    this.getDeploymentGroup(deploymentGroupName, (err, deploymentGroup) => {
      if (isNotFound(err) || !deploymentGroup) {
        console.error(`DeploymentGroup "${deploymentGroupName}" for machine ${id} not found`);
        return;
      }

      if (err) {
        console.error(err);
        return;
      }

      Queue(deploymentGroup.id, () => {
        return new Promise((resolve) => {
          assertService(deploymentGroup, (err) => {
            if (err) {
              console.error(err);
            }

            resolve();
          });
        });
      });
    });
  }
};

module.exports.DEPLOYMENT_GROUP = DEPLOYMENT_GROUP;
module.exports.SERVICE = SERVICE;
module.exports.HASH = HASH;
