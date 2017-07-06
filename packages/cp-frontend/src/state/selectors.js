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

const activeInstanceStatuses = [
  'PROVISIONING',
  'READY',
  'ACTIVE',
  'RUNNING',
  'STOPPING',
  'INCOMPLETE'
];

const getInstanceStatuses = (service) => {

  const instanceStatuses = service.instances.reduce((statuses, instance) => {
    // if (instance.status !== 'RUNNING') {
      if (statuses[instance.status]) {
        statuses[instance.status]++;
      } else {
        statuses[instance.status] = 1;
      }
    // }
    return statuses;
  }, {});

  return Object.keys(instanceStatuses).map(status => ({
    status,
    count: instanceStatuses[status]
  }));
}

const getInstancesActive = (instanceStatuses) => {
  return instanceStatuses.reduce((active, instanceStatus) =>
    activeInstanceStatuses.indexOf(instanceStatus.status) === -1 ?
      active : true, false);
}

const getService = (service, index) => {

  const statuses = getInstanceStatuses(service);
  const instancesActive = getInstancesActive(statuses);
  const instanceStatuses =  statuses.length === 1 && statuses[0].status === 'RUNNING' ?
    [] : statuses;
  return ({
      index,
      ...service,
      instanceStatuses,
      instancesActive,
      isConsul: service.slug === 'consul'
    });
};

const processServices = (services) => {

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
      const child = getService(s, i);
      parent.instancesActive = parent.instancesActive ? true : child.instancesActive;
      parent.children.push(child);
    } else {
      const serviceIndex = ss.findIndex(existingS => existingS.id === s.id);
      if (serviceIndex === -1) {
        ss.push(getService(s, i));
      } else {
        ss.splice(serviceIndex, 1, {
          ...ss[serviceIndex],
          ...getService(s, i)
        });
      }
    }
    return ss;
  }, []);
};

const processServicesForTopology = (services) => {

  const processedServices = processServices(services);

  const connectedServices = processedServices.reduce((connections, service) =>
      service.connections && service.connections.length ?
        connections.concat(service.connections).concat(service.id) : connections, []);

  return processedServices.map(service => ({
      ...service,
      connected: connectedServices.indexOf(service.id) !== -1
    }));
}

export {
  deploymentGroupBySlug as deploymentGroupBySlugSelector,
  serviceBySlug as serviceBySlugSelector,
  processServices,
  processServicesForTopology,
  instancesByServiceId
};
