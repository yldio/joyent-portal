'use strict';

const Hoek = require('hoek');
const Penseur = require('penseur');
const DCClient = require('docker-compose-client');
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

module.exports = class Data {
  constructor (options) {
    const settings = Hoek.applyToDefaults(options || {}, internals.defaults);

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(settings.name, settings.db);
    this._docker = new DCClient(settings.dockerHost);
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
    Hoek.assert(clientVersion && clientVersion.manifestId, 'manifestId is required');

    // go get the manifest to find the deployment group id so we can update it
    this.getManifest({ id: clientVersion.manifestId }, (err, manifest) => {
      if (err) {
        return cb(err);
      }

      if (!manifest) {
        return cb(new Error('manifest not found for version'));
      }

      const version = Transform.toVersion(clientVersion);
      this._db.versions.insert(version, (err, key) => {
        if (err) {
          return cb(err);
        }

        this._db.deployment_groups.update(manifest.deploymentGroupId, { history_version_ids: this._db.append(key) }, (err) => {
          if (err) {
            return cb(err);
          }

          version.id = key;
          cb(null, Transform.fromVersion(version));
        });
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

    if (manifestId) {
      return this._db.versions.query({ manifest_id: manifestId }, finish);
    }

    this.getDeploymentGroup({ id: deploymentGroupId }, (err, deploymentGroup) => {
      if (err) {
        return finish(err);
      }

      this._db.versions.get(deploymentGroup.history, finish);
    });
  }


  // manifests

  provisionManifest (clientManifest, cb) {
    this._db.manifests.insert(Transform.toManifest(clientManifest), (err, key) => {
      if (err) {
        return cb(err);
      }

      this.getManifest({ id: key }, cb);
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
};
