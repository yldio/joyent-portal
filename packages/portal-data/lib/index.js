'use strict';

const Hoek = require('hoek');
const Penseur = require('penseur');
const DCClient = require('docker-compose-client');
const Awaitify = require('apr-awaitify');

const internals = {
  defaults: {
    name: 'portal',
    db: {
      test: false
    },
    dockerHost: 'tcp://0.0.0.0:4242'
  },
  tables: [
    'activities',
    'datacenters',
    'deployments',
    'manifests',
    'metrics'
  ]
};

module.exports = class Data {
  constructor (options) {
    const settings = Hoek.applyToDefaults(options || {}, internals.defaults);

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(settings.name, settings.db);
    this._docker = new DCClient(settings.dockerHost);
  }

  connect () {
    return new Promise((resolve, reject) => {
      this._db.establish(internals.tables, (err) => {
        if (err) {
          return reject(err);
        }

        // promisify Penseur
        internals.tables.forEach((tableName) => {
          return ['insert', 'get', 'update', 'remove', 'all'].forEach((methodName) => {
            this._db[tableName][methodName] = Awaitify(
              this._db[tableName][methodName]
            );
          });
        });

        resolve();
      });
    });
  }

  /*
   * DeploymentGroupUuid
   * Manifest
   *  id: UUID,
   *  created: Date.now(),
   *  type: 'docker-compose',
   *  format: 'yml',
   *  raw: 'original yml file content',
   *  obj: { }
   */
  createDeployment ({ deploymentGroupUuid, manifest, deployment }) {
    // trigger deployment
    // create deployment queue (we should think about what is a deployment queue)
    // create the ConvergencePlans
    // create a DeploymentPlan
    // create a Version
    // update the DeploymentGroup

    // TODO
    const updateDb = (plan) => {
      // deployment.services = [];
      // deployment.state = { current: 'stopped' };

      this._db.deployments
        .insert({
          name: deployment.name
        })
        .then((key) => {
          deployment.id = key;
          return deployment;
        });
    };

    const provision = ({ name }) => {
      return this._docker
        .provision({
          projectName: name,
          manifest: manifest.raw
        })
        .then(updateDb);
    };

    this.getDeployment(deploymentGroupUuid).then(provision);
  }

  getDeployment (id) {
    return this._db.deployments.get(id);
  }

  updateDeployment (deployment) {
    return this._db.deployments.update(deployment.id, deployment);
  }

  deleteDeployment (id) {
    return this._db.deployments.remove(id);
  }

  getDeployments () {
    return this._db.deployments.all();
  }

  getDatacenters () {
    return this._db.datacenters.all();
  }

  createManifest (deploymentId, manifest) {
    manifest.deploymentId = deploymentId;
    manifest.created = Date.now();

    return this._db.manifests.insert().then((id) => {
      manifest.id = id;
      return manifest;
    });
  }
  getManifest (id) {
    return this._db.manifests.get();
  }

  getActivities (deploymentId) {
    return this._db.activities.query({ deploymentId });
  }

  getMetrics (containerId) {
    return this._db.metrics.get(containerId);
  }

  insertMetrics (containerId, metrics) {
    return this._db.metrics.get(containerId).then((existing) => {
      if (existing) {
        return this._db.metrics.update(containerId, {
          metrics: this._db.append(metrics)
        });
      }

      const entry = { id: containerId, metrics };
      return this._db.metrics.insert(entry, { merge: true });
    });
  }

  getServices (deploymentId) {
    this._db.deployments.get(deploymentId, { filter: 'services' });
  }

  updateService (deploymentId, service) {
    this._db.deployments.get(deploymentId, { filter: 'services' }).then((deployment) => {
      const serviceToUpdate = deployment.services.find((currentService) => {
        return currentService.name === service.name;
      });

      if (!serviceToUpdate) {
        deployment.services.push(service);
      } else {
        serviceToUpdate.count = service.count;
        serviceToUpdate.containers = service.containers;
      }

      return this._db.deployments.update(deploymentId, {
        services: deployment.services
      });
    });
  }

  deploymentChanges (handler) {
    return this._db.deployments.changes('*', { reconnect: true, handler });
  }
};
