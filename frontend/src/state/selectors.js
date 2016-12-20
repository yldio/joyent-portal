const find = require('lodash.find');
const forceArray = require('force-array');
const get = require('lodash.get');
const reselect = require('reselect');

const {
  createSelector
} = reselect;

const account = (state) => get(state, 'account.data', {});
const orgUiSections = (state) => get(state, 'orgs.ui.sections', []);
const projectUiSections = (state) => get(state, 'projects.ui.sections', []);
const orgs = (state) => get(state, 'orgs.data', []);
const projects = (state) => get(state, 'projects.data', []);

const projectById= (id) => createSelector(
  projects,
  (projects) => find(projects, ['id', id])
);

const orgById = (id) => createSelector(
  orgs,
  (orgs) => find(orgs, ['id', id])
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

module.exports = {
  accountSelector: account,
  orgByIdSelector: orgById,
  orgsSelector: orgs,
  orgSectionsSelector: orgSections,
  projectSectionsSelector: projectUiSections,
  projectsByOrgIdSelector: projectsByOrgId,
  projectByIdSelector: projectById
};
