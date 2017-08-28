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

/* const instancesByServiceId = serviceId =>
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
  ); */

// Apollo gql utils //

const activeInstanceStatuses = [
  'PROVISIONING',
  'READY',
  'ACTIVE',
  'RUNNING',
  'INCOMPLETE'
];

const transitionalServiceStatuses = [
  'PROVISIONING',
  'SCALING',
  'STOPPING',
  'DELETING',
  'RESTARTING'
];

const getInstanceStatuses = service => {
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
};

const getInstancesActive = instanceStatuses => {
  return instanceStatuses.reduce(
    (active, instanceStatus) =>
      activeInstanceStatuses.indexOf(instanceStatus.status) === -1
        ? active
        : true,
    false
  );
};

const getInstancesHealthy = instances => {
  return instances.reduce(
    (healthy, instance) => ({
      total: healthy.total + 1,
      healthy:
        instance.healthy === 'HEALTHY' ? healthy.healthy + 1 : healthy.healthy
    }),
    { total: 0, healthy: 0 }
  );
};

const getService = (service, index) => {
  const instanceStatuses = getInstanceStatuses(service);
  const instancesActive = getInstancesActive(instanceStatuses);
  const instancesHealthy = getInstancesHealthy(service.instances);
  const transitionalStatus =
    transitionalServiceStatuses.indexOf(service.status) !== -1;
  return {
    index,
    ...service,
    instanceStatuses,
    instancesActive,
    instancesHealthy,
    transitionalStatus,
    isConsul: service.slug === 'consul'
  };
};

const processServices = services => {
  return forceArray(services).reduce((ss, s, i) => {
    if (s.status !== 'DELETED') {
      const service = getService(s, i);
      if (s.branches && s.branches.length) {
        service.children = processServices(s.branches);
      }
      ss.push(service);
    }

    return ss;
  }, []);
};

const processServicesForTopology = services => {
  const processedServices = processServices(services);

  const connectedServices = processedServices.reduce((connections, service) => {
    if (!service.connections || !service.connections.length) {
      return connections;
    }

    const existingConnections = service.connections.reduce(
      (connections, connection) => {
        const connectionExists = processedServices.filter(
          ps => ps.id === connection
        ).length;
        if (connectionExists) {
          connections.push(connection);
        }
        return connections;
      },
      []
    );

    return existingConnections.length
      ? connections.concat(existingConnections).concat(service.id)
      : connections;
  }, []);

  return processedServices.map(service => ({
    ...service,
    connected: connectedServices.indexOf(service.id) !== -1
  }));
};

/* ,
  instancesByServiceId */
export {
  deploymentGroupBySlug as deploymentGroupBySlugSelector,
  serviceBySlug as serviceBySlugSelector,
  getInstanceStatuses,
  getInstancesActive,
  getInstancesHealthy,
  getService,
  processServices,
  processServicesForTopology
};
