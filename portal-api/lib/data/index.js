'use strict';

const Hoek = require('hoek');
const Penseur = require('penseur');


const internals = {
  defaults: {
    name: 'portal'
  }
};


module.exports = class Data {
  constructor (options) {
    const settings = Hoek.applyToDefaults(options || {}, internals.defaults);
    const name = settings.name;
    delete settings.name;

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(name, settings);
  }

  connect (cb) {
    this._db.establish(['activities', 'datacenters', 'deployments', 'metrics'], cb);
  }

  createDeployment (deployment) {
    return new Promise((resolve, reject) => {
      this._db.deployments.insert(deployment, (err, key) => {
        if (err) {
          return reject(err);
        }

        deployment.id = key;

        resolve(deployment);
      });
    });
  }

  getDeployment (id) {
    return new Promise((resolve, reject) => {
      this._db.deployments.get(id, (err, deployment) => {
        return err ? reject(err) : resolve(deployment);
      });
    });
  }

  updateDeployment (deployment) {
    return new Promise((resolve, reject) => {
      this._db.deployments.update(deployment.id, deployment, (err) => {
        return err ? reject(err) : resolve(deployment);
      });
    });
  }

  deleteDeployment (id) {
    return new Promise((resolve, reject) => {
      this._db.deployments.remove(id, (err) => {
        return err ? reject(err) : resolve();
      });
    });
  }

  getDeployments () {
    return new Promise((resolve, reject) => {
      this._db.deployments.all((err, deployments) => {
        return err ? reject(err) : resolve(deployments);
      });
    });
  }

  getDatacenters () {
    return new Promise((resolve, reject) => {
      this._db.datacenters.all((err, datacenters) => {
        return err ? reject(err) : resolve(datacenters);
      });
    });
  }

  createManifest (deploymentId, manifest) {
    return new Promise((resolve, reject) => {
      this._db.deployments.update(deploymentId, { manifests: this._db.append(manifest) }, (err, deployment) => {
        return err ? reject(err) : resolve(deployment);
      });
    });
  }
  getManifest (deploymentId, revision) {
    return new Promise((resolve, reject) => {
      this._db.deployments.get(deploymentId, { filter: 'manifests', from: revision, count: 1 }, (err, manifest) => {
        return err ? reject(err) : resolve(manifest);
      });
    });
  }

  getActivities (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.activities.query({ deploymentId }, (err, activities) => {
        return err ? reject(err) : resolve(activities);
      });
    });
  }

  getMetrics (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.metrics.query({ deploymentId }, (err, activities) => {
        return err ? reject(err) : resolve(activities);
      });
    });
  }

  getState (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.deployment.query({ id: deploymentId }, { filter: 'state' }, (err, state) => {
        return err ? reject(err) : resolve(state);
      });
    });
  }
  updateState (deploymentId, action) {
    return new Promise((resolve, reject) => {
      const changes = { state: { action } };
      this._db.deployment.update(deploymentId, changes, (err, keys) => {
        if (err) {
          return reject(err);
        }

        this._db.deployment.get(deploymentId, { filter: 'state' }, (err, state) => {
          return err ? reject(err) : resolve(state);
        });
      });
    });
  }

  getServices (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.deployment.get(deploymentId, { filter: 'services' }, (err, services) => {
        return err ? reject(err) : resolve(services);
      });
    });
  }
  updateService (deploymentId, service) {
    return new Promise((resolve, reject) => {
      const changes = { services: service };
      this._db.deployment.update(deploymentId, changes, (err, keys) => {
        if (err) {
          return reject(err);
        }

        this._db.deployment.get(deploymentId, { filter: 'services' }, (err, services) => {
          return err ? reject(err) : resolve(services);
        });
      });
    });
  }
};
