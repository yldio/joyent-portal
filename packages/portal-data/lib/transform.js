'use strict';

const Yamljs = require('yamljs');


exports.fromPortal = function ({ portal, datacenter, deploymentGroups, user }) {
  return {
    id: portal.id,
    user,
    datacenter,
    deploymentGroups
  };
};

exports.toPortal = function (clientPortal) {
  return {
    user_id: clientPortal.user ? clientPortal.user.id : '',
    datacenter_id: clientPortal.datacenter ? clientPortal.datacenter.id : '',
    deployment_group_ids: clientPortal.deploymentGroups ? clientPortal.deploymentGroups.map((deploymentGroup) => {
      return deploymentGroup.id;
    }) : []
  };
};


exports.fromDeploymentGroup = function (deploymentGroup, services) {
  return {
    id: deploymentGroup.id,
    name: deploymentGroup.name,
    slug: deploymentGroup.slug,
    services,
    version: deploymentGroup.version_id,
    history: deploymentGroup.history_version_ids || []
  };
};

exports.toDeploymentGroup = function ({ name }) {
  return {
    name,
    slug: '',
    services: [],
    version_id: '',
    history_version_ids: []
  };
};


exports.fromService = function ({ service, instances, packages }) {
  return {
    id: service.id,
    hash: service.version_hash,
    deploymentGroupId: service.deployment_group_id,
    name: service.name,
    slug: service.slug,
    environment: service.environment || [],
    instances,
    currentMetrics: [],
    connections: service.service_dependency_ids,
    package: packages ? exports.fromPackage(packages) : {},
    parent: service.parent_id || ''
  };
};

exports.toService = function (clientService) {
  return {
    version_hash: clientService.hash || '',
    deployment_group_id: clientService.deploymentGroupId,
    name: clientService.name,
    slug: clientService.slug || '',
    environment: clientService.environment || {},
    instance_ids: clientService.instances ? clientService.instances.map((instance) => { return instance.id; }) : [],
    service_dependency_ids: clientService.connections || [],
    package_id: clientService.package ? clientService.package.id : '',
    parent_id: clientService.parent || ''
  };
};


exports.toVersion = function (clientVersion) {
  return {
    id: clientVersion.id,
    created: clientVersion.created || Date.now(),
    manifest_id: clientVersion.manifestId,
    service_scales: clientVersion.scales ? clientVersion.scales.map(exports.toScale) : [],
    plan: exports.toPlan(clientVersion.plan || {})
  };
};

exports.fromVersion = function (version) {
  return {
    id: version.id,
    created: version.created,
    manifestId: version.manifest_id,
    scales: version.service_scales ? version.service_scales.map(exports.fromScale) : [],
    plan: exports.fromPlan(version.plan || {})
  };
};


exports.toScale = function (clientScale) {
  return {
    service_name: clientScale.serviceName,
    replicas: clientScale.replicas
  };
};

exports.fromScale = function (scale) {
  return {
    serviceName: scale.service_name,
    replicas: scale.replicas
  };
};


exports.toPlan = function (clientPlan) {
  return {
    running: clientPlan.running,
    actions: clientPlan.actions
  };
};

exports.fromPlan = function (plan) {
  return {
    running: plan.running,
    actions: plan.actions
  };
};


exports.toManifest = function (clientManifest) {
  return {
    id: clientManifest.id,
    deployment_group_id: clientManifest.deploymentGroupId,
    created: clientManifest.created || Date.now(),
    type: clientManifest.type,
    format: clientManifest.format,
    raw: clientManifest.raw,
    json: clientManifest.json || Yamljs.parse(clientManifest.raw)
  };
};

exports.fromManifest = function (manifest) {
  return {
    id: manifest.id,
    deploymentGroupId: manifest.deployment_group_id,
    created: manifest.created,
    type: manifest.type,
    format: manifest.format,
    raw: manifest.raw,
    json: manifest.json
  };
};


exports.fromPackage = function (packages) {
  return packages;
};

exports.toPackage = function (packages) {
  return packages;
};


exports.fromInstance = function (instance) {
  return {
    id: instance.id,
    name: instance.name,
    machineId: instance.machine_id,
    status: instance.status || ''
  };
};

exports.toInstance = function (clientInstance) {
  return {
    id: clientInstance.id,
    name: clientInstance.name,
    machine_id: clientInstance.machineId,
    status: clientInstance.status || ''
  };
};


exports.fromUser = function (user) {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    login: user.login
  };
};

exports.toUser = function (clientUser) {
  return {
    id: clientUser.id,
    first_name: clientUser.firstName,
    last_name: clientUser.lastName,
    email: clientUser.email,
    login: clientUser.login
  };
};
