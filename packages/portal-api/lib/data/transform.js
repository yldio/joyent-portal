'use strict';

const Yamljs = require('yamljs');
const ParamCase = require('param-case');

const clean = (v) => {
  return JSON.parse(JSON.stringify(v));
};

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


exports.fromDeploymentGroup = function (deploymentGroup) {
  return {
    id: deploymentGroup.id,
    name: deploymentGroup.name,
    slug: deploymentGroup.slug,
    services: deploymentGroup.services,
    version: deploymentGroup.version,
    history: deploymentGroup.history,
    imported: deploymentGroup.imported,
    status: deploymentGroup.status
  };
};

exports.toDeploymentGroup = function (clientDeploymentGroup) {
  return clean({
    id: clientDeploymentGroup.id,
    name: clientDeploymentGroup.name,
    slug: clientDeploymentGroup.slug ?
      clientDeploymentGroup.slug :
      clientDeploymentGroup.name ?
        ParamCase(clientDeploymentGroup.name) :
        undefined,
    service_ids: Array.isArray(clientDeploymentGroup.services) ? clientDeploymentGroup.services.map(({ id }) => {
      return id;
    }).filter(Boolean) : undefined,
    version_id: clientDeploymentGroup.version ? clientDeploymentGroup.version.id : undefined,
    history_version_ids: Array.isArray(clientDeploymentGroup.history) ? clientDeploymentGroup.history.map(({ id }) => {
      return id;
    }).filter(Boolean) : undefined,
    imported: clientDeploymentGroup.imported,
    status: clientDeploymentGroup.status || 'ACTIVE'
  });
};


exports.fromService = function ({ service, instances, packages }) {
  return {
    id: service.id,
    hash: service.version_hash,
    deploymentGroupId: service.deployment_group_id,
    name: service.name,
    slug: service.slug,
    instances,
    connections: service.service_dependency_ids,
    branches: service.branches,
    config: service.config ? service.config : undefined,
    status: service.status,
    hasPlan: service.has_plan
  };
};

exports.toService = function (clientService) {
  // wat??
  return clean({
    id: clientService.id,
    version_hash: clientService.hash,
    deployment_group_id: clientService.deploymentGroupId,
    name: clientService.name,
    slug: clientService.slug,
    instance_ids: clientService.instances ?
      clientService.instances.map((instance) => {
        return instance.id;
      }) :
      undefined,
    service_dependency_ids: clientService.connections,
    branches: clientService.branches,
    config: clientService.config ? clientService.config : undefined,
    status: clientService.status,
    has_plan: clientService.hasPlan
  });
};


exports.toVersion = function (clientVersion) {
  return clean({
    id: clientVersion.id,
    created: clientVersion.created || Date.now(),
    manifest_id: (clientVersion.manifest || {}).id,
    service_scales: clientVersion.scale ? clientVersion.scale : undefined,
    plan: clientVersion.plan ? clientVersion.plan : undefined,
    error: clientVersion.version
  });
};

exports.fromVersion = function (version) {
  return {
    id: version.id,
    created: version.created,
    manifest: version.manifest,
    scale: version.service_scales,
    plan: version.plan,
    error: version.error
  };
};


exports.toManifest = function (clientManifest) {
  return {
    id: clientManifest.id,
    deployment_group_id: clientManifest.deploymentGroupId,
    created: clientManifest.created || Date.now(),
    type: clientManifest.type,
    format: clientManifest.format,
    environment: clientManifest.environment,
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
    environment: manifest.environment,
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
    status: instance.status,
    healthy: instance.healthy,
    watchers: instance.watchers,
    jobs: instance.jobs
  };
};


exports.toInstance = function (clientInstance) {
  return clean({
    id: clientInstance.id,
    name: clientInstance.name,
    machine_id: clientInstance.machineId,
    status: clientInstance.status,
    healthy: clientInstance.healthy,
    watchers: clientInstance.watchers,
    jobs: clientInstance.jobs
  });
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
