const find = require('lodash.find');
const forceArray = require('force-array');
const get = require('lodash.get');
const reselect = require('reselect');

const {
  createSelector
} = reselect;

const account = (state) => get(state, 'account.data', {});
const accountUi = (state) => get(state, 'account.ui', {});
const orgUiSections = (state) => get(state, 'orgs.ui.sections', []);
const projectUiSections = (state) => get(state, 'projects.ui.sections', []);
const serviceUiSections = (state) => get(state, 'services.ui.sections', []);
const orgs = (state) => get(state, 'orgs.data', []);
const orgUI = (state) => get(state, 'orgs.ui', []);
const projects = (state) => get(state, 'projects.data', []);
const services = (state) => get(state, 'services.data', []);
const collapsedServices = (state) => get(state, 'services.ui.collapsed', []);
const collapsedInstances = (state) => get(state, 'instances.ui.collapsed', []);
const instances = (state) => get(state, 'instances.data', []);
const members = (state) => get(state, 'members.data', []);
const metricsUI = (state) => get(state, 'metrics.ui', {});
const metricTypes = (state) => get(state, 'metrics.data.types', []);
// const metricDatasets = (state) => get(state, 'metrics.data.datasets', []);
const metricsData = (state) => get(state, 'metrics.data', {});

const projectById = (projectId) => createSelector(
  projects,
  (projects) => find(projects, ['id', projectId])
);

const orgById = (orgId) => createSelector(
  orgs,
  (orgs) => find(orgs, ['id', orgId])
);

const orgIndexById = (orgId) => createSelector(
  orgs,
  (orgs) => orgs.map((o) => o.id).indexOf(orgId)
);

const serviceById = (serviceId) => createSelector(
  [services],
  (services) => find(services, ['id', serviceId])
);

const projectsByOrgId = (orgId) => createSelector(
  [projects, orgById(orgId)],
  (projects, org) => projects.filter((p) => p.org === org.uuid)
);

const orgSections = (orgId) => createSelector(
  [orgById(orgId), orgUiSections],
  (org, sections) => sections.filter(
    (section) => forceArray(org.hide).indexOf(section) < 0
  )
);

const isCollapsed = (collapsed, uuid) => collapsed.indexOf(uuid) >= 0;

const datasets = (metricsData, serviceOrInstanceMetrics, metricsUI) =>
  serviceOrInstanceMetrics.map((soim) => ({
    ...find(metricsData.datasets, [ 'uuid', soim.dataset ]),
    type: find(metricsData.types, [ 'id', soim.type ]),
    ...metricsUI[soim.dataset]
  }));

const servicesByProjectId = (projectId) => createSelector(
  [services, projectById(projectId), collapsedServices, metricsData, metricsUI],
  (services, project, collapsed, metrics, metricsUI) =>
    services.filter((s) => s.project === project.uuid)
    .map((service) => ({
      ...service,
      services: services.filter((s) => s.parent === service.uuid)
    }))
    .filter((s) => !s.parent)
    .map((service) => ({
      ...service,
      metrics: datasets(metrics, service.metrics, metricsUI),
      collapsed: isCollapsed(collapsed, service.uuid),
      services: service.services.map((service) => ({
        ...service,
        metrics: datasets(metrics, service.metrics, metricsUI),
        collapsed: isCollapsed(collapsed, service.uuid)
      }))
    }))
);

const instancesByServiceId = (serviceId) => createSelector(
  [
    instances,
    serviceById(serviceId),
    collapsedInstances,
    metricsData,
    metricsUI
  ],
  (instances, service, collapsed, metrics, metricsUI) =>
    instances.filter((i) => i.service === service.uuid)
    .map((instance) => ({
      ...instance,
      metrics: datasets(metrics, instance.metrics, metricsUI),
      collapsed: isCollapsed(collapsed, instance.uuid)
    }))
);

const metricsByServiceId = (serviceId) => createSelector(
  [serviceById(serviceId), metricsData, metricsUI],
  (service, metrics, metricsUI) => datasets(metrics, service.metrics, metricsUI)
);

const metricTypeByUuid = (metricTypeUuid) => createSelector(
  [metricTypes],
  (metricTypes) => find(metricTypes, ['uuid', metricTypeUuid])
);


const instancesByProjectId = (projectId) => createSelector(
  [instances, projectById(projectId), collapsedInstances, metricsData],
  (instances, project, collapsed, metrics) =>
    instances.filter((i) => i.project === project.uuid)
    .map((instance) => ({
      ...instance,
      metrics: datasets(metrics, instance.metrics),
      collapsed: isCollapsed(collapsed, instance.uuid)
    }))
);

const peopleByOrgId = (orgId) => createSelector(
  [members, orgById(orgId)], (members, org) => {
    const matched = [];
    if (Object.keys(org.members).length > 0) {
      org.members.filter((m) => {
        matched.push({
          ...find(members, ['uuid', m.uuid]),
          ...m
        });
      });
    }
    return matched;
  }
);

module.exports = {
  accountSelector: account,
  accountUISelector: accountUi,
  orgByIdSelector: orgById,
  orgsSelector: orgs,
  orgUISelector: orgUI,
  orgIndexSelector: orgIndexById,
  servicesSelector: services,
  serviceByIdSelector: serviceById,
  orgSectionsSelector: orgSections,
  projectSectionsSelector: projectUiSections,
  serviceSectionsSelector: serviceUiSections,
  projectsByOrgIdSelector: projectsByOrgId,
  projectByIdSelector: projectById,
  servicesByProjectIdSelector: servicesByProjectId,
  instancesByServiceIdSelector: instancesByServiceId,
  metricsByServiceIdSelector: metricsByServiceId,
  metricTypesSelector: metricTypes,
  instancesByProjectIdSelector: instancesByProjectId,
  metricTypeByUuidSelector: metricTypeByUuid,
  peopleByOrgIdSelector: peopleByOrgId,
  membersSelector: members,
};
