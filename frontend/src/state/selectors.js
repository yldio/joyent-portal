import { createSelector } from 'reselect';

const apollo = (state) => state.apollo;

const deploymentGroupById = (deploymentGroupPathName) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((dg, k) =>
    apollo[k].__typename === 'DeploymentGroup' &&
      apollo[k].pathName === deploymentGroupPathName ?
        apollo[k] : dg, {}) : null
);

const servicesById = (servicePathName) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((s, k) =>
    apollo[k].__typename === 'Service' &&
      apollo[k].pathName === servicePathName ?
        apollo[k] : s, {}) : null
);

export {
  deploymentGroupById as deploymentGroupByIdSelector,
  servicesById as servicesByIdSelector
}
