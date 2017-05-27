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
            this.getDeploymentGroups(portal.deployment_group_ids, next);
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

  createDeploymentGroup ({ name }, cb) {
    // trigger deployment
    // create deployment queue (we should think about what is a deployment queue)
    // create the ConvergencePlans
    // create a DeploymentPlan
    // create a Version
    // update the DeploymentGroup

    this._db.deployment_groups.insert({ name }, (err, key) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromDeploymentGroup({ id: key, name }));
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

  getDeploymentGroups (ids, cb) {
    this._db.deployment_groups.get(ids, (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      deploymentGroups = deploymentGroups || [];
      cb(null, deploymentGroups.map(Transform.fromDeploymentGroup));
    });
  }

  getDeploymentGroup (id, cb) {
    this._db.deployment_groups.single({ id }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromDeploymentGroup(deploymentGroup || {}));
    });
  }


  // versions

  createVersion (clientVersion, cb) {
    const version = Transform.toVersion(clientVersion);
    this._db.versions.insert(version, (err, key) => {
      if (err) {
        return cb(err);
      }

      version.id = key;
      cb(null, Transform.fromVersion(version));
    });
  }

  getVersion (id, cb) {
    this._db.versions.single({ id }, (err, version) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromVersion(version));
    });
  }
};
