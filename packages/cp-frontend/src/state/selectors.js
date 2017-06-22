import { createSelector } from 'reselect';
import forceArray from 'force-array';

const apollo = state => state.apollo;

// Redux selectors //

const deploymentGroupBySlug = deploymentGroupSlug =>
  createSelector(
    [apollo],
    apollo =>
      apollo && apollo.data
        ? Object.keys(apollo.data).reduce(
            (dg, k) =>
              apollo.data[k].__typename === 'DeploymentGroup' &&
                apollo.data[k].slug === deploymentGroupSlug
                ? apollo.data[k]
                : dg,
            null
          )
        : null
  );

const serviceBySlug = serviceSlug =>
  createSelector(
    [apollo],
    apollo =>
      apollo && apollo.data
        ? Object.keys(apollo.data).reduce(
            (s, k) =>
              apollo.data[k].__typename === 'Service' &&
                apollo.data[k].slug === serviceSlug
                ? apollo.data[k]
                : s,
            null
          )
        : null
  );

const instancesByServiceId = serviceId =>
  createSelector(
    [apollo],
    apollo =>
      apollo && apollo.data
        ? Object.keys(apollo.data).reduce((is, i, k) => {
            if (
              apollo.data[k].__typename === 'Instance' &&
              apollo.data[k].service === serviceId
            ) {
              is.push(apollo.data[k]);
            }
            return is;
          }, [])
        : null
  );

const serviceWidthInstancesBySlug = serviceSlug => {
  const service = serviceBySlug(serviceSlug);
};

// Apollo gql utils //

const findService = (services, uuid) =>
  services.reduce((service, s) => (s.uuid === uuid ? s : service), null);

const getService = (service, index, datacenter) => ({
  index,
  ...service,
  // Tmp for topology
  metrics: [1, 2, 3].map(m => ({
    name: `${m}`,
    value: `${m}`
  })),
  instances: service.instances.length,
  datacenter
});

const processServices = (services, datacenter) => {
  console.log('services = ', services);
  return forceArray(services).reduce((ss, s, i) => {
    // Check whether it exits in thing, if so, add as child
    // if not, create and add as child

    if (s.parent) {
      let parent = findService(ss, s.parent);
      if (!parent) {
        parent = { uuid: s.parent };
        ss.push(parent);
      }
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(getService(s, i, datacenter));
    }
    if (!s.parent) {
      ss.push(getService(s, i, datacenter));
    }
    return ss;
  }, []);
};

export {
  deploymentGroupBySlug as deploymentGroupBySlugSelector,
  serviceBySlug as serviceBySlugSelector,
  processServices
};
