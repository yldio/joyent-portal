'use strict';

const EventEmitter = require('events');
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
    dockerHost: 'tcp://0.0.0.0:4242'
  },
  tables: {
    'portals': { id: { type: 'uuid' } },
    'datacenters': { id: { type: 'uuid' } },
    'deployment_groups': { id: { type: 'uuid' } },
    'versions': { id: { type: 'uuid' } },
    'manifests': { id: { type: 'uuid' } },
    'services': { id: { type: 'uuid' } },
    'packages': { id: { type: 'uuid' } },
    'instances': { id: { type: 'uuid' } }
  }
};

module.exports = class Data extends EventEmitter {
  constructor (options) {
    super();
    const settings = Hoek.applyToDefaults(options || {}, internals.defaults);

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(settings.name, settings.db);
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

  getPortal (cb) {
    this._db.portals.all((err, portals) => {
      if (err) {
        return cb(err);
      }

      const portal = portals[0];
      VAsync.parallel({
        funcs: [
          (next) => {
            this.getDatacenter({ id: portal.datacenter_id }, next);
          },
          (next) => {
            this.getDeploymentGroups({ ids: portal.deployment_group_ids }, next);
          }
        ]
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        cb(null, Transform.fromPortal({ portal, datacenter: results.successes[0], deploymentGroups: results.successes[1] }));
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
      return this._db.datacenters.single({ region }, cb);
    }

    this._db.datacenters.single({ id }, cb);
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

      deploymentGroups = deploymentGroups || [];
      cb(null, deploymentGroups.map(Transform.fromDeploymentGroup));
    };

    if (ids) {
      return this._db.deployment_groups.get(ids, finish);
    }

    if (name) {
      return this._db.deployment_groups.query({ name }, finish);
    }

    this._db.deployment_groups.query({ slug }, finish);
  }

  getDeploymentGroup (query, cb) {
    this._db.deployment_groups.single(query, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromDeploymentGroup(deploymentGroup || {}));
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


  // manifests

  provisionManifest (clientManifest, cb) {
    // insert manifest
    // callback with manifest
    // provision services

    const manifest = Transform.toManifest(clientManifest);
    this._db.manifests.insert(manifest, (err, key) => {
      if (err) {
        return cb(err);
      }

      setImmediate(() => {
        const options = {
          manifestServices: manifest.json.services || manifest.json,
          deploymentGroupId: clientManifest.deploymentGroupId,
          manifestId: key
        };
        this.provisionServices(options);
      });

      manifest.id = key;
      cb(null, Transform.fromManifest(manifest));
    });
  }

  getManifest ({ id }, cb) {
    console.log(id);
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

  provisionServices ({ manifestServices, deploymentGroupId, manifestId }, cb) {
    // call to docker and create containers
    // insert instance information
    // insert service information
    // insert version information -- will update deploymentGroups

    cb = cb || ((err) => {
      if (err) {
        this.emit('error', err);
      }
    });

    // TODO: call out to docker for each service and provision a new instance

    VAsync.forEachPipeline({
      func: (serviceName, next) => {
        const manifestService = manifestServices[serviceName];
        const clientInstance = {
          name: serviceName,
          machineId: 'unknown',
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
            deploymentGroupId,
            instances: [createdInstance]
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
        deploymentGroupId,
        manifestId,
        scales,
        plan,
        serviceIds
      };

      this.createVersion(clientVersion, (err) => {
        if (err) {
          return cb(err);
        }

        cb();
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

      VAsync.parallel({
        funcs: [
          (next) => {
            this._db.instances.get(service.instance_ids, next);
          },
          (next) => {
            this._db.packages.single({ id: service.package_id }, next);
          }
        ]
      }, (err, results) => {
        if (err) {
          return cb(err);
        }

        cb(null, Transform.fromService({ service, instances: results.successes[0], package: results.successes[1] }));
      });
    });
  }

  // TODO: get services with join/merge


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
