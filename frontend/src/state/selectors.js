import { createSelector } from 'reselect';

const apollo = (state) => state.apollo;

// redux selectors //

const deploymentGroupBySlug = (deploymentGroupSlug) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((dg, k) =>
    apollo[k].__typename === 'DeploymentGroup' &&
      apollo[k].slug === deploymentGroupSlug ?
        apollo[k] : dg, {}) : null
);

const servicesBySlug = (serviceSlug) => createSelector(
  [apollo],
  (apollo) => apollo ? Object.keys(apollo).reduce((s, k) =>
    apollo[k].__typename === 'Service' &&
      apollo[k].slug === serviceSlug ?
        apollo[k] : s, {}) : null
);

// apollo gql utils //

const findService = (services, uuid) =>
  services.reduce((service, s) => s.uuid === uuid ?
    s : service, null);

const getService = (service, index, datacenter) => ({
  index,
  ...service,
  // tmp for topology
  metrics: [1, 2, 3].map((m) => ({
      name: `${m}`,
      value: `${m}`
    })),
  instances: service.instances.length,
  datacenter
});

const processServices = (services, datacenter) => {
  console.log('services = ', services);
  return services.reduce((ss, s, i) => {
    // check whether it exits in thing, if so, add as child
    // if not, create and add as child

    if(s.parent) {
      let parent = findService(ss, s.parent);
      if(!parent) {
        parent = { uuid: s.parent };
        ss.push(parent);
      }
      if(!parent.children) {
        parent.children = [];
      }
      parent.children.push(getService(s, i, datacenter));
    }
    if(!s.parent) {
      ss.push(getService(s, i, datacenter));
    }
    return ss;
  }, []);
}

export {
  deploymentGroupBySlug as deploymentGroupBySlugSelector,
  servicesBySlug as servicesBySlugSelector,
  processServices as processServices
}
