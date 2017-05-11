import { createSelector } from 'reselect';

const apollo = (state) => state.apollo;

const deploymentGroupById = (deploymentGroupId) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((dg, k) =>
    apollo[k].__typename === 'DeploymentGroup' &&
      apollo[k].id === deploymentGroupId ?
        apollo[k] : dg, {}) : null
);

const servicesById = (serviceId) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((s, k) =>
    apollo[k].__typename === 'Service' &&
      apollo[k].id === serviceId ?
        apollo[k] : s, {}) : null
);

export {
  deploymentGroupById as deploymentGroupByIdSelector,
  servicesById as servicesByIdSelector
}
