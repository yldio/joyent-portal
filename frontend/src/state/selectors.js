const find = require('lodash.find');
const forceArray = require('force-array');
const reselect = require('reselect');

const {
  createSelector
} = reselect;

const account = (state) => state.account.data;
const orgUiSections = (state) => state.orgs.ui.sections;
const orgs = (state) => state.orgs.data;
const projects = (state) => state.projects.data;

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
  projectsByOrgIdSelector: projectsByOrgId
};
