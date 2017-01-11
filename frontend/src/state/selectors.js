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
const projects = (state) => get(state, 'projects.data', []);
const services = (state) => get(state, 'services.data', []);
const collapsedServices = (state) => get(state, 'services.ui.collapsed', []);
const collapsedInstances = (state) => get(state, 'instances.ui.collapsed', []);
const instances = (state) => get(state, 'instances.data', []);
const metricDatasets = (state) => get(state, 'metrics.data.datasets', []);

const projectById = (projectId) => createSelector(
  projects,
  (projects) => find(projects, ['id', projectId])
);

const orgById = (orgId) => createSelector(
  orgs,
  (orgs) => find(orgs, ['id', orgId])
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

const datasets = (metrics, uuids) => uuids.map((uuid) => find(metrics, [
  'uuid',
  uuid
]));

const servicesByProjectId = (projectId) => createSelector(
  [services, projectById(projectId), collapsedServices, metricDatasets],
  (services, project, collapsed, metrics) =>
    services.filter((s) => s.project === project.uuid)
    .map((service) => ({
      ...service,
      services: services.filter((s) => s.parent === service.uuid)
    }))
    .filter((s) => !s.parent)
    .map((service) => ({
      ...service,
      metrics: datasets(metrics, service.metrics),
      collapsed: isCollapsed(collapsed, service.uuid),
      services: service.services.map((service) => ({
        ...service,
        metrics: datasets(metrics, service.metrics),
        collapsed: isCollapsed(collapsed, service.uuid)
      }))
    }))
);

const instancesByServiceId = (serviceId) => createSelector(
  [instances, serviceById(serviceId), collapsedInstances, metricDatasets],
  (instances, service, collapsed, metrics) =>
    instances.filter((i) => i.service === service.uuid)
    .map((instance) => ({
      ...instance,
      metrics: datasets(metrics, instance.metrics),
      collapsed: isCollapsed(collapsed, instance.uuid)
    }))
);


module.exports = {
  accountSelector: account,
  accountUISelector: accountUi,
  orgByIdSelector: orgById,
  orgsSelector: orgs,
  servicesSelector: services,
  serviceByIdSelector: serviceById,
  orgSectionsSelector: orgSections,
  projectSectionsSelector: projectUiSections,
  serviceSectionsSelector: serviceUiSections,
  projectsByOrgIdSelector: projectsByOrgId,
  projectByIdSelector: projectById,
  servicesByProjectIdSelector: servicesByProjectId,
  instancesByServiceIdSelector: instancesByServiceId
};
