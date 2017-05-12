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
    return new Promise((resolve, reject) => {
      this._db.establish(['activities', 'datacenters', 'deployments', 'manifests', 'metrics'], (err) => {
        if (typeof cb === 'function') {
          return cb(err);
        }

        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  createDeployment (deployment) {
    return new Promise((resolve, reject) => {
      deployment.services = [];
      deployment.state = { current: 'stopped' };

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
        return err ? reject(err) : resolve(datacenters || []);
      });
    });
  }

  createManifest (deploymentId, manifest) {
    return new Promise((resolve, reject) => {
      manifest.deploymentId = deploymentId;
      manifest.created = Date.now();

      this._db.manifests.insert(manifest, (err, id) => {
        if (err) {
          return reject(err);
        }

        manifest.id = id;
        resolve(manifest);
      });
    });
  }
  getManifest (id) {
    return new Promise((resolve, reject) => {
      this._db.manifests.get(id, (err, manifest) => {
        return err ? reject(err) : resolve(manifest);
      });
    });
  }

  getActivities (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.activities.query({ deploymentId }, (err, activities) => {
        return err ? reject(err) : resolve(activities || []);
      });
    });
  }

  getMetrics (containerId) {
    return new Promise((resolve, reject) => {
      this._db.metrics.get(containerId, (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  insertMetrics (containerId, metrics) {
    return new Promise((resolve, reject) => {
      this._db.metrics.get(containerId, (err, existing) => {
        if (err) {
          return reject(err);
        }

        if (existing) {
          this._db.metrics.update(containerId, { metrics: this._db.append(metrics) }, (err) => {
            return err ? reject(err) : resolve(existing);
          });
          return;
        }

        const entry = { id: containerId, metrics };
        this._db.metrics.insert(entry, { merge: true }, (err) => {
          return err ? reject(err) : resolve(entry);
        });
      });
    });
  }

  getServices (deploymentId) {
    return new Promise((resolve, reject) => {
      this._db.deployments.get(deploymentId, { filter: 'services' }, (err, deployment) => {
        return err ? reject(err) : resolve(deployment.services);
      });
    });
  }

  updateService (deploymentId, service) {
    return new Promise((resolve, reject) => {
      this._db.deployments.get(deploymentId, { filter: 'services' }, (err, deployment) => {
        if (err) {
          return reject(err);
        }

        const serviceToUpdate = deployment.services.find((currentService) => {
          return (currentService.name === service.name);
        });

        if (!serviceToUpdate) {
          deployment.services.push(service);
        } else {
          serviceToUpdate.count = service.count;
          serviceToUpdate.containers = service.containers;
        }

        this._db.deployments.update(deploymentId, { services: deployment.services }, (err) => {
          return err ? reject(err) : resolve(service);
        });
      });
    });
  }

  deploymentChanges (handler) {
    return new Promise((resolve, reject) => {
      this._db.deployments.changes('*', { reconnect: true, handler }, (err) => {
        return err ? reject(err) : resolve();
      });
    });
  }
};
