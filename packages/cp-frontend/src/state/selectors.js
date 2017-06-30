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

// Apollo gql utils //

const findService = (services, uuid) =>
  services.reduce((service, s) => (s.uuid === uuid ? s : service), null);

const getInstanceStatuses = (service) => {

  const instanceStatuses = service.instances.reduce((statuses, instance) => {
    if (instance.status !== 'RUNNING') {
      if (statuses[instance.status]) {
        statuses[instance.status]++;
      } else {
        statuses[instance.status] = 1;
      }
    }
    return statuses;
  }, {});

  return Object.keys(instanceStatuses).map(status => ({
    status,
    count: instanceStatuses[status]
  }));
}

const getService = (service, index, datacenter) => ({
  index,
  ...service,
  datacenter,
  instanceStatuses: getInstanceStatuses(service),
  isConsul: service.slug === 'consul'
});

const processServices = (services, datacenter) => {
  return forceArray(services).reduce((ss, s, i) => {
    if (s.parent) {
      const parents = ss.filter(parentS => parentS.id === s.parent);
      let parent;
      if (parents.length) {
        parent = parents[0];
      } else {
        parent = { id: s.parent };
        ss.push(parent);
      }
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(getService(s, i, datacenter));
    } else {
      const serviceIndex = ss.findIndex(existingS => existingS.id === s.id);
      if (serviceIndex === -1) {
        ss.push(getService(s, i, datacenter));
      } else {
        ss.splice(serviceIndex, 1, {
          ...ss[serviceIndex],
          ...getService(s, i, datacenter)
        });
      }
    }
    return ss;
  }, []);
};

export {
  deploymentGroupBySlug as deploymentGroupBySlugSelector,
  serviceBySlug as serviceBySlugSelector,
  processServices,
  instancesByServiceId
};
