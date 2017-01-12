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
const instances = (state) => get(state, 'instances.data', []);
const metrics = (state) => get(state, 'metrics.data', []);

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

const servicesByProjectId = (projectId) => createSelector(
  [services, projectById(projectId), collapsedServices],
  (services, project, collapsed) =>
    services.filter((s) => s.project === project.uuid)
    .map((service) => ({
      ...service,
      services: services.filter((s) => s.parent === service.uuid)
    }))
    .filter((s) => !s.parent)
    .map((service) => ({
      ...service,
      collapsed: collapsed.indexOf(service.uuid) >= 0,
      services: service.services.map((service) => ({
        ...service,
        collapsed: collapsed.indexOf(service.uuid) >= 0
      }))
    }))
);

const instancesByServiceId = (serviceId) => createSelector(
  [instances, serviceById(serviceId)],
  (instances, service) =>
    instances.filter((i) => i.service === service.uuid)
);

const metricsByServiceId = (serviceId) => createSelector(
  [metrics, serviceById(serviceId)],
  (metrics, service) =>
    metrics.filter((i) => i.service === service.uuid)
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
  instancesByServiceIdSelector: instancesByServiceId,
  metricsByServiceIdSelector: metricsByServiceId
};
