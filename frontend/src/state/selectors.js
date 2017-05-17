import { createSelector } from 'reselect';

const apollo = (state) => state.apollo;

const deploymentGroupById = (deploymentGroupSlug) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((dg, k) =>
    apollo[k].__typename === 'DeploymentGroup' &&
      apollo[k].slug === deploymentGroupSlug ?
        apollo[k] : dg, {}) : null
);

const servicesById = (serviceSlug) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((s, k) =>
    apollo[k].__typename === 'Service' &&
      apollo[k].slug === serviceSlug ?
        apollo[k] : s, {}) : null
);

export {
  deploymentGroupById as deploymentGroupByIdSelector,
  servicesById as servicesByIdSelector
}
