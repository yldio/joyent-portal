'use strict';

const EventEmitter = require('events');
const DockerClient = require('docker-compose-client');
const Dockerode = require('dockerode');
const Hoek = require('hoek');
const Penseur = require('penseur');
const VAsync = require('vasync');
const Transform = require('./transform');


const internals = {
  defaults: {
    name: 'portal',
    db: {
      test: false
    },
    dockerComposeHost: 'tcp://0.0.0.0:4242'
  },
  tables: {
    'portals': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'datacenters': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'deployment_groups': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'versions': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'manifests': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'services': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'packages': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'instances': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'users': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false }
  }
};

module.exports = class Data extends EventEmitter {
  constructor (options) {
    super();
    const settings = Hoek.applyToDefaults(internals.defaults, options || {});

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(settings.name, settings.db);
    this._dockerCompose = new DockerClient(settings.dockerComposeHost);
    this._docker = new Dockerode(settings.docker);

    this._dockerCompose.on('error', (err) => {
      this.emit('error', err);
    });
  }

  connect (cb) {
    this._db.establish(internals.tables, cb);
  }


  // portals

  createPortal (clientPortal, cb) {
    const portal = Transform.toPortal(clientPortal);
    this._db.portals.insert(portal, (err, key) => {
      if (err) {
        return cb(err);
      }

      portal.id = key;
      cb(null, Transform.fromPortal({ portal }));
    });
  }

  getPortal (options, cb) {
    this._db.portals.all((err, portals) => {
      if (err) {
        return cb(err);
      }

      if (!portals) {
        return cb();
      }

      const portal = portals[0];
      VAsync.parallel({
        funcs: [
          (next) => {
            this.getDatacenter({ id: portal.datacenter_id }, next);
          },
          (next) => {
            this.getUser({}, next);
          }
        ]
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        // Sub query/filter for deploymentGroups
        const deploymentGroups = (args) => {
          return new Promise((resolve, reject) => {
            this.getDeploymentGroups(args, (err, groups) => {
              if (err) {
                return reject(err);
              }

              resolve(groups);
            });
          });
        };

        cb(null, Transform.fromPortal({
          portal,
          deploymentGroups,
          datacenter: results.operations[0].result,
          user: results.operations[1].result
        }));
      });
    });
  }


  // datacenters

  createDatacenter (datacenter, cb) {
    this._db.datacenters.insert(datacenter, (err, key) => {
      if (err) {
        return cb(err);
      }

      datacenter.id = key;
      cb(null, datacenter);
    });
  }

  getDatacenters (cb) {
    this._db.datacenters.all(cb);
  }

  getDatacenter ({ id, region }, cb) {
    Hoek.assert(id || region, 'id or region are required to retrieve a datacenter');

    if (region) {
      return this._db.datacenters.query({ region }, (err, datacenters) => {
        if (err) {
          return cb(err);
        }

        return cb(null, datacenters && datacenters.length ? datacenters[0] : null);
      });
    }

    this._db.datacenters.get(id, cb);
  }


  // users

  createUser (clientUser, cb) {
    const user = Transform.toUser(clientUser);
    this._db.users.insert(user, (err, key) => {
      if (err) {
        return cb(err);
      }

      user.id = key;
      cb(null, Transform.fromUser(user));
    });
  }

  getUser (options, cb) {
    this._db.users.all((err, users) => {
      if (err) {
        return cb(err);
      }

      if (!users || !users.length) {
        return cb();
      }

      cb(null, Transform.fromUser(users[0]));
    });
  }


  // deployment_groups

  createDeploymentGroup (clientDeploymentGroup, cb) {
    // trigger deployment
    // create deployment queue (we should think about what is a deployment queue)
    // create the ConvergencePlans
    // create a DeploymentPlan
    // create a Version
    // update the DeploymentGroup

    const deploymentGroup = Transform.toDeploymentGroup(clientDeploymentGroup);
    this._db.deployment_groups.insert(deploymentGroup, (err, key) => {
      if (err) {
        return cb(err);
      }

      deploymentGroup.id = key;
      cb(null, Transform.fromDeploymentGroup(deploymentGroup));
    });
  }

  updateDeploymentGroup ({ id, name }, cb) {
    this._db.deployment_groups.update(id, { name }, (err) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromDeploymentGroup({ id, name }));
    });
  }

  getDeploymentGroups ({ ids, name, slug }, cb) {
    const finish = (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      const getServices = (service_ids) => {
        return (args) => {
          args = args || {};
          args.ids = service_ids;
          return new Promise((resolve, reject) => {
            this.getServices(args, (err, services) => {
              if (err) {
                return reject(err);
              }

              resolve(services);
            });
          });
        };
      };

      const convertedGroups = deploymentGroups ? deploymentGroups.map((deploymentGroup) => {
        return Transform.fromDeploymentGroup(deploymentGroup, getServices(deploymentGroup.service_ids));
      }) : [];

      cb(null, convertedGroups);
    };

    if (ids) {
      return this._db.deployment_groups.get(ids, finish);
    }

    if (name) {
      return this._db.deployment_groups.query({ name }, finish);
    }

    if (slug) {
      return this._db.deployment_groups.query({ slug }, finish);
    }

    return this._db.deployment_groups.all(finish);
  }

  getDeploymentGroup (query, cb) {
    this._db.deployment_groups.query(query, (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      if (!deploymentGroups || !deploymentGroups.length) {
        return cb(null, {});
      }

      const deploymentGroup = deploymentGroups[0];
      if (!deploymentGroup.service_ids || !deploymentGroup.service_ids.length) {
        return cb(null, Transform.fromDeploymentGroup(deploymentGroup));
      }

      const getServices = (args) => {
        args = args || {};
        args.ids = deploymentGroup.service_ids;
        return new Promise((resolve, reject) => {
          this.getServices(args, (err, services) => {
            if (err) {
              return reject(err);
            }

            resolve(services || []);
          });
        });
      };

      cb(err, Transform.fromDeploymentGroup(deploymentGroup, getServices));
    });
  }


  // versions

  createVersion (clientVersion, cb) {
    Hoek.assert(clientVersion, 'version is required');
    Hoek.assert(clientVersion.manifestId, 'manifestId is required');
    Hoek.assert(clientVersion.deploymentGroupId, 'deploymentGroupId is required');

    const version = Transform.toVersion(clientVersion);
    this._db.versions.insert(version, (err, key) => {
      if (err) {
        return cb(err);
      }

      const changes = {
        id: clientVersion.deploymentGroupId,
        version_id: key,
        history_version_ids: this._db.append(key)
      };

      if (clientVersion.serviceIds) {
        changes['service_ids'] = clientVersion.serviceIds;
      }

      this._db.deployment_groups.update([changes], (err) => {
        if (err) {
          return cb(err);
        }

        version.id = key;
        cb(null, Transform.fromVersion(version));
      });
    });
  }

  getVersion ({ id, manifestId }, cb) {
    const query = id ? { id } : { manifest_id: manifestId };
    this._db.versions.single(query, (err, version) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromVersion(version));
    });
  }

  getVersions ({ manifestId, deploymentGroupId }, cb) {
    const finish = (err, versions) => {
      if (err) {
        return cb(err);
      }

      versions = versions || [];
      cb(null, versions.map(Transform.fromVersion));
    };

    // ensure the data is in sync
    this._db.versions.sync(() => {
      if (manifestId) {
        return this._db.versions.query({ manifest_id: manifestId }, finish);
      }

      this.getDeploymentGroup({ id: deploymentGroupId }, (err, deploymentGroup) => {
        if (err) {
          return finish(err);
        }

        this._db.versions.get(deploymentGroup.history, finish);
      });
    });
  }

  scale ({ id, replicas }, cb) {
    Hoek.assert(id, 'service id is required');
    Hoek.assert(typeof replicas === 'number' && replicas >= 0, 'replicas must be a number no less than 0');


    // get the service then get the deployment group
    // use the deployment group to find the current version and manifest
    // scale the service
    // update the machine ids and instances

    this._db.services.single({ id }, (err, service) => {
      if (err) {
        return cb(err);
      }

      if (!service) {
        return cb(new Error(`service not found for id: ${id}`));
      }

      this._db.deployment_groups.single({ id: service.deployment_group_id }, (err, deployment_group) => {
        if (err) {
          return cb(err);
        }

        if (!deployment_group) {
          return cb(new Error(`deployment group not found for service with service id: ${id}`));
        }

        this._db.versions.single({ id: deployment_group.version_id }, (err, version) => {
          if (err) {
            return cb(err);
          }

          if (!version) {
            return cb(new Error(`version not found for service with service id: ${id}`));
          }

          this._db.manifests.single({ id: version.manifest_id }, (err, manifest) => {
            if (err) {
              return cb(err);
            }

            if (!manifest) {
              return cb(new Error(`manifest not found for service with service id: ${id}`));
            }

            this._scale({ service, deployment_group, version, manifest, replicas }, cb);
          });
        });
      });
    });
  }

  _scale ({ service, deployment_group, version, manifest, replicas }, cb) {
    let isFinished = false;
    const finish = () => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      const machineIds = [];
      for (let i = 1; i <= replicas; ++i) {
        machineIds.push(`${deployment_group.name}_${service.name}_${i}`);
      }

      this._db.instances.remove(service.instance_ids, (err) => {
        // emit error instead of returning early, this is a best effort to cleanup data
        if (err) {
          this.emit('error', err);
        }

        VAsync.forEachParallel({
          func: (machineId, next) => {
            const clientInstance = {
              machineId,
              status: 'CREATED',
              name: service.name
            };
            this.createInstance(clientInstance, next);
          },
          inputs: machineIds
        }, (err, results) => {
          if (err) {
            return cb(err);
          }

          const instanceIds = results.successes.map((instance) => {
            return instance.id;
          });

          this._db.services.update(service.id, { instance_ids: instanceIds }, (err) => {
            if (err) {
              return cb(err);
            }

            const clientVersion = {
              deploymentGroupId: deployment_group.id,
              manifestId: manifest.id,
              plan: {
                running: true,
                actions: [{
                  type: 'CREATE',
                  service: service.name,
                  machines: machineIds
                }]
              }
            };

            const scale = version.service_scales.find((scale) => {
              return scale.service_name === service.name;
            });

            if (scale) {
              scale.replicas = replicas;
            } else {
              version.service_scales.push({
                service_name: service.name,
                replicas
              });
            }

            clientVersion.scales = version.service_scales.map(Transform.fromScale);

            this.createVersion(clientVersion, cb);
          });
        });
      });
    };

    const options = {
      projectName: deployment_group.name,
      services: {},
      manifest: manifest.raw
    };
    options.services[service.name] = replicas;
    this._dockerCompose.scale(options, (err, res) => {
      if (err) {
        return cb(err);
      }
      console.log(JSON.stringify(res, null, '  '));
      finish();
    });
  }


  // manifests

  provisionManifest (clientManifest, cb) {
    // get deployment group to verify it exists and get the name
    // insert manifest
    // callback with manifest
    // provision containers and save service data

    this.getDeploymentGroup({ id: clientManifest.deploymentGroupId }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      if (!deploymentGroup) {
        return cb(new Error('Deployment group not found for manifest'));
      }

      const manifest = Transform.toManifest(clientManifest);
      this._db.manifests.insert(manifest, (err, key) => {
        if (err) {
          return cb(err);
        }

        setImmediate(() => {
          let isHandled = false;
          this._dockerCompose.provision({ projectName: deploymentGroup.name, manifest: clientManifest.raw }, (err, res) => {
            if (err) {
              this.emit('error', err);
              return;
            }

            // callback can execute multiple times, ensure responses are only handled once
            if (isHandled) {
              return;
            }

            isHandled = true;
            const options = {
              manifestServices: manifest.json.services || manifest.json,
              deploymentGroup,
              manifestId: key,
              provisionRes: res
            };
            this.provisionServices(options);
          });
        });

        manifest.id = key;
        cb(null, Transform.fromManifest(manifest));
      });
    });
  }

  getManifest ({ id }, cb) {
    this._db.manifests.single({ id }, (err, manifest) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromManifest(manifest || {}));
    });
  }

  getManifests ({ type, deploymentGroupId }, cb) {
    const query = type ? { type } : { deployment_group_id: deploymentGroupId };
    this._db.manifests.query(query, (err, manifests) => {
      if (err) {
        return cb(err);
      }

      manifests = manifests || [];
      cb(null, manifests.map(Transform.fromManifest));
    });
  }


  // services

  provisionServices ({ manifestServices, deploymentGroup, manifestId, provisionRes }, cb) {
    // insert instance information
    // insert service information
    // insert version information -- will update deploymentGroups

    cb = cb || ((err) => {
      if (err) {
        this.emit('error', err);
      }
    });

    VAsync.forEachPipeline({
      func: (serviceName, next) => {
        const manifestService = manifestServices[serviceName];
        const container = provisionRes[serviceName].plan.containers[0];

        const clientInstance = {
          name: serviceName,
          machineId: container ? container.id : `${deploymentGroup.name}_${serviceName}_1`,
          status: 'CREATED'
        };
        this.createInstance(clientInstance, (err, createdInstance) => {
          if (err) {
            return next(err);
          }

          const clientService = {
            hash: manifestService.image,
            name: serviceName,
            slug: serviceName,
            deploymentGroupId: deploymentGroup.id,
            instances: [createdInstance],
            info: provisionRes[serviceName]
          };

          this.createService(clientService, (err, createdService) => {
            if (err) {
              return next(err);
            }

            return next(null, {
              action: {
                type: 'CREATE',
                service: serviceName,
                machines: [createdInstance.machineId]
              },
              serviceId: createdService.id,
              scale: {
                serviceName,
                replicas: 1
              }
            });
          });
        });
      },
      inputs: Object.keys(manifestServices)
    }, (err, results) => {
      if (err) {
        return cb(err);
      }
      const successes = results.successes;
      if (!successes || !successes.length) {
        return cb();
      }

      const scales = successes.map((result) => {
        return result.scale;
      });

      const actions = successes.map((result) => {
        return result.action;
      });

      const serviceIds = successes.map((result) => {
        return result.serviceId;
      });

      const plan = {
        running: true,
        actions
      };

      const clientVersion = {
        deploymentGroupId: deploymentGroup.id,
        manifestId,
        scales,
        plan,
        serviceIds
      };

      this.createVersion(clientVersion, (err, version) => {
        if (err) {
          return cb(err);
        }

        cb(null, version);
      });
    });
  }

  createService (clientService, cb) {
    this._db.services.insert(Transform.toService(clientService), (err, key) => {
      if (err) {
        return cb(err);
      }

      clientService.id = key;
      cb(null, clientService);
    });
  }

  getService ({ id, hash }, cb) {
    const query = id ? { id } : { version_hash: hash };
    this._db.services.query(query, (err, service) => {
      if (err) {
        return cb(err);
      }

      if (!service) {
        return cb(null, null);
      }

      this._db.packages.single({ id: service.package_id }, (err, packages) => {
        if (err) {
          return cb(err);
        }

        cb(null, Transform.fromService({ service, instances: this._instancesFilter(service.instance_ids), packages }));
      });
    });
  }

  _getDeploymentGroupServices (deploymentGroupSlug, cb) {
    this.getDeploymentGroup({ slug: deploymentGroupSlug }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      if (!deploymentGroup) {
        return cb(null, {});
      }

      return this.getServices({ deploymentGroupId: deploymentGroup.id }, cb);
    });
  }

  getServices (options, cb) {
    if (options.deploymentGroupSlug) {
      return this._getDeploymentGroupServices(options.deploymentGroupSlug, cb);
    }

    const query = {};
    if (options.ids && options.ids.length) {
      query.id = this._db.or(options.ids);
    }

    if (options.name) {
      query.name = options.name;
    }

    if (options.slug) {
      query.slug = options.slug;
    }

    if (options.parentId) {
      query.parent_id = options.parentId;
    }

    if (options.deploymentGroupId) {
      query.deployment_group_id = options.deploymentGroupId;
    }

    this._db.services.query(query, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.map((service) => {
        return Transform.fromService({ service, instances: this._instancesFilter(service.instance_ids) });
      }));
    });
  }

  _instancesFilter (instanceIds) {
    return ({ name, machineId, status }) => {
      return new Promise((resolve, reject) => {
        const query = {
          id: this._db.or(instanceIds)
        };

        if (name) {
          query.name = name;
        }

        if (machineId) {
          query.machine_id = machineId;
        }

        if (status) {
          query.status = status;
        }

        this._db.instances.query(query, (err, instances) => {
          if (err) {
            return reject(err);
          }

          if (!instances || !instances.length) {
            return resolve([]);
          }

          resolve(instances.map(Transform.fromInstance));
        });
      });
    };
  }

  stopServices ({ ids }, cb) {
    this._db.services.get(ids, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      let instanceIds = [];
      services.forEach((service) => {
        instanceIds = instanceIds.concat(service.instance_ids);
      });

      VAsync.forEachParallel({
        func: (instanceId, next) => {
          this._db.instances.get(instanceId, (err, instance) => {
            if (err) {
              return next(err);
            }

            const container = this._docker.getContainer(instance.machine_id);

            container.stop((err) => {
              if (err) {
                return next(err);
              }

              this.updateInstance({ id: instance.id, status: 'STOPPED' }, next);
            });
          });
        },
        inputs: instanceIds
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        this.getServices({ ids }, cb);
      });
    });
  }

  startServices ({ ids }, cb) {
    this._db.services.get(ids, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      let instanceIds = [];
      services.forEach((service) => {
        instanceIds = instanceIds.concat(service.instance_ids);
      });

      VAsync.forEachParallel({
        func: (instanceId, next) => {
          this._db.instances.get(instanceId, (err, instance) => {
            if (err) {
              return next(err);
            }

            const container = this._docker.getContainer(instance.machine_id);

            container.start((err) => {
              if (err) {
                return next(err);
              }

              this.updateInstance({ id: instance.id, status: 'RUNNING' }, next);
            });
          });
        },
        inputs: instanceIds
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        this.getServices({ ids }, cb);
      });
    });
  }

  restartServices ({ ids }, cb) {
    this._db.services.get(ids, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      let instanceIds = [];
      services.forEach((service) => {
        instanceIds = instanceIds.concat(service.instance_ids);
      });

      VAsync.forEachParallel({
        func: (instanceId, next) => {
          this._db.instances.get(instanceId, (err, instance) => {
            if (err) {
              return next(err);
            }

            this.updateInstance({ id: instance.id, status: 'RESTARTING' }, () => {
              const container = this._docker.getContainer(instance.machine_id);

              container.restart((err) => {
                if (err) {
                  return next(err);
                }

                this.updateInstance({ id: instance.id, status: 'RUNNING' }, next);
              });
            });
          });
        },
        inputs: instanceIds
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        this.getServices({ ids }, cb);
      });
    });
  }

  deleteServices ({ ids }, cb) {
    this._db.services.get(ids, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      let instanceIds = [];
      services.forEach((service) => {
        instanceIds = instanceIds.concat(service.instance_ids);
      });

      VAsync.forEachParallel({
        func: (instanceId, next) => {
          this._db.instances.get(instanceId, (err, instance) => {
            if (err) {
              return next(err);
            }

            const container = this._docker.getContainer(instance.machine_id);

            // Use force in case the container is running. TODO: should we keep force?
            container.remove({ force: true }, (err) => {
              if (err) {
                return next(err);
              }

              this.updateInstance({ id: instance.id, status: 'DELETED' }, next);
            });
          });
        },
        inputs: instanceIds
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        this.getServices({ ids }, cb);
      });
    });
  }


  // instances

  createInstance (clientInstance, cb) {
    this._db.instances.insert(Transform.toInstance(clientInstance), (err, key) => {
      if (err) {
        return cb(err);
      }

      clientInstance.id = key;
      cb(null, clientInstance);
    });
  }

  getInstance ({ id }, cb) {
    this._db.instances.single({ id }, (err, instance) => {
      if (err) {
        return cb(err);
      }

      cb(null, instance ? Transform.fromInstance(instance) : {});
    });
  }

  updateInstance ({ id, status }, cb) {
    this._db.instances.update(id, { status }, (err, instance) => {
      if (err) {
        return cb(err);
      }

      cb(null, instance ? Transform.fromInstance(instance) : {});
    });
  }


  // packages

  createPackage (clientPackage, cb) {
    this._db.packages.insert(Transform.toPackage(clientPackage), (err, key) => {
      if (err) {
        return cb(err);
      }

      clientPackage.id = key;
      cb(null, clientPackage);
    });
  }

  getPackage ({ id }, cb) {
    this._db.packages.single({ id }, (err, dbPackage) => {
      if (err) {
        return cb(err);
      }

      cb(null, dbPackage ? Transform.fromPackage(dbPackage) : {});
    });
  }

  getPackages ({ name, type }, cb) {
    const query = name ? { name } : { type };
    this._db.packages.query(query, (err, dbPackages) => {
      if (err) {
        return cb(err);
      }

      cb(null, dbPackages ? dbPackages.map(Transform.fromPackage) : []);
    });
  }
};
