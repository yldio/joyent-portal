'use strict';

// Deployments

exports.deploymentCreate = function (request, reply) {
  const deploymentRoute = request.server.lookup('deploymentGet');

  this.createDeployment(request.payload).then((deployment) => {
    reply(deployment).created(deploymentRoute.path.replace('{deployment}', deployment.id));
  }).catch((error) => {
    reply(error);
  });
};

exports.deploymentGet = function (request, reply) {
  reply(this.getDeployment(request.deploymentId));
};

exports.deploymentUpdate = function (request, reply) {
  const payload = request.payload;
  payload.id = request.deploymentId;

  reply(this.updateDeployment(payload));
};

exports.deploymentDelete = function (request, reply) {
  reply(this.deleteDeployment(request.deploymentId));
};

exports.deploymentsGet = function (request, reply) {
  reply(this.getDeployments());
};


// Datacenters

exports.datacentersGet = function (request, reply) {
  reply(this.getDatacenters());
};


// Manifests

exports.manifestCreate = function (request, reply) {
  const manifestRoute = request.server.lookup('manifestGet');
  const deploymentId = request.params.deploymentId;

  this.createManifest(deploymentId, request.payload).then((manifest) => {
    reply(manifest).created(manifestRoute.path.replace('{deployment}', deploymentId).replace('{revision}', manifest.revision));
  }).catch((error) => {
    reply(error);
  });
};

exports.manifestGet = function (request, reply) {
  reply(this.getManifest(request.params.deploymentId, request.params.revision));
};


// Activities and Metrics

exports.activitiesGet = function (request, reply) {
  reply(this.getActivities(request.params.deploymentId));
};

exports.metricsGet = function (request, reply) {
  reply(this.getMetrics(request.params.deploymentId));
};


// Deployment Group State

exports.stateGet = function (request, reply) {
  reply(this.getState(request.params.deploymentId));
};

exports.stateUpdate = function (request, reply) {
  reply(this.updateState(request.params.deploymentId, request.payload.action));
};


// Services

exports.servicesGet = function (request, reply) {
  reply(this.getServices(request.params.deploymentId));
};

exports.serviceUpdate = function (request, reply) {
  const service = request.payload;
  service.name = request.params.name;

  reply(this.updateService(request.params.deploymentId, service));
};
