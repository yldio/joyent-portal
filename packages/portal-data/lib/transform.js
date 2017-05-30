'use strict';


exports.fromPortal = function ({ portal, datacenter, deploymentGroups }) {
  deploymentGroups = Array.isArray(deploymentGroups) ? deploymentGroups : [];

  return {
    id: portal.id,
    username: portal.username,
    datacenter,
    deploymentGroups: deploymentGroups.map(exports.fromDeploymentGroup)
  };
};

exports.toPortal = function (clientPortal) {
  return {
    username: clientPortal.username,
    datacenter_id: clientPortal.datacenter ? clientPortal.datacenter.id : '',
    deployment_group_ids: clientPortal.deploymentGroups ? clientPortal.deploymentGroups.map((deploymentGroup) => {
      return deploymentGroup.id;
    }) : []
  };
};

exports.fromDeploymentGroup = function (deploymentGroup, services) {
  if (!Array.isArray(services)) {
    services = [];
  }

  return {
    id: deploymentGroup.id,
    name: deploymentGroup.name,
    slug: deploymentGroup.slug,
    services: services.map(exports.fromService),
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


exports.fromService = function (service) {

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
    json: clientManifest.json
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
