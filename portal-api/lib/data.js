'use strict';

const Examples = require('./models/examples');


module.exports = class Data {
  constructor (options) {
    this._options = options;
  }

  createDeployment (deployment) {
    return new Promise((resolve, reject) => {
      resolve(Examples.deployment);
    });
  }
  getDeployment (id) {
    return new Promise((resolve, reject) => {
      resolve(Examples.deployment);
    });
  }
  updateDeployment (deployment) {
    return new Promise((resolve, reject) => {
      resolve(Examples.deployment);
    });
  }
  deleteDeployment (id) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  getDeployments () {
    return new Promise((resolve, reject) => {
      resolve(Examples.deployments);
    });
  }

  getDatacenters () {
    return new Promise((resolve, reject) => {
      resolve(Examples.datacenters);
    });
  }

  createManifest (deploymentId, manifest) {
    return new Promise((resolve, reject) => {
      resolve(Examples.manifest);
    });
  }
  getManifest (deploymentId, revision) {
    return new Promise((resolve, reject) => {
      resolve(Examples.manifest);
    });
  }

  getActivities (deploymentId) {
    return new Promise((resolve, reject) => {
      resolve(Examples.activities);
    });
  }
  getMetrics (deploymentId) {
    return new Promise((resolve, reject) => {
      resolve(Examples.metrics);
    });
  }

  getState (deploymentId) {
    return new Promise((resolve, reject) => {
      resolve(Examples.state);
    });
  }
  updateState (deploymentId, action) {
    return new Promise((resolve, reject) => {
      resolve(Examples.state);
    });
  }

  getServices (deploymentId) {
    return new Promise((resolve, reject) => {
      resolve(Examples.services);
    });
  }
  updateService (deploymentId, service) {
    return new Promise((resolve, reject) => {
      resolve(Examples.service);
    });
  }
};
