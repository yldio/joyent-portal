const { v4: uuid } = require('uuid');
const paramCase = require('param-case');
const camelCase = require('camel-case');
const buildArray = require('build-array');
const lfind = require('lodash.find');
const findIndex = require('lodash.findindex');
const flatten = require('lodash.flatten');
const random = require('lodash.random');
const uniq = require('lodash.uniq');
const yaml = require('js-yaml');
const hasha = require('hasha');

const wpData = require('./wp-data.json');
const cpData = require('./cp-data.json');
const complexData = require('./complex-data.json');

const { datacenter, portal } = require('./data.json');

const deploymentGroups = [
  wpData.deploymentGroup,
  cpData.deploymentGroup,
  complexData.deploymentGroup
];

const services = wpData.services
  .concat(cpData.services)
  .concat(complexData.services);

const instances = wpData.instances
  .concat(cpData.instances)
  .concat(complexData.instances);

const find = (query = {}) => item =>
  Object.keys(query).every(key => item[key] === query[key]);

const cleanQuery = (q = {}) => JSON.parse(JSON.stringify(q));

const getInstances = query => {
  return Promise.resolve(instances.filter(find(cleanQuery(query))));
};

const getUnfilteredServices = query => {
  const instancesResolver = ({ id }) => query =>
    getInstances(
      Object.assign({}, query, {
        serviceId: id
      })
    );

  const addNestedResolvers = service =>
    Object.assign({}, service, {
      instances: instancesResolver(service),
      branches: (service.branches || []).map(service =>
        Object.assign({}, service, {
          id: hasha(JSON.stringify(service)),
          instances: query =>
            Promise.resolve(
              flatten(
                service.instances.map(id =>
                  instances.filter(find(Object.assign({}, query, { id })))
                )
              )
            )
        })
      )
    });

  return Promise.resolve(
    services.filter(find(cleanQuery(query))).map(addNestedResolvers)
  );
};

const getServices = query => {
  // get all services
  const services = getUnfilteredServices(query)
    // get all instances
    .then(services =>
      Promise.all(
        services.map(service => service.instances())
      ).then(instances => ({
        services,
        instances
      }))
    )
    .then(({ services, instances }) => {
      // filter all available instances
      const availableInstances = flatten(
        instances.filter(
          ({ status }) => ['DELETED', 'EXITED'].indexOf(status) < 0
        )
      );
      // get all the serviceIds of the available instances
      // and then get the servcies with those ids
      return uniq(
        availableInstances.map(({ serviceId }) => serviceId)
      ).map(serviceId => lfind(services, ['id', serviceId]));
    });

  return Promise.resolve(services);
};

const getDeploymentGroups = query => {
  const servicesResolver = ({ id }) => query =>
    getServices(
      Object.assign({}, query, {
        deploymentGroupId: id
      })
    );

  const addNestedResolvers = dg =>
    Object.assign({}, dg, {
      services: servicesResolver(dg)
    });

  return Promise.resolve(
    deploymentGroups.filter(find(cleanQuery(query))).map(addNestedResolvers)
  );
};

const getPortal = () =>
  Promise.resolve(
    Object.assign({}, portal, {
      datacenter,
      deploymentGroups: getDeploymentGroups
    })
  );

const createDeploymentGroup = ({ name }) => {
  const _dg = {
    slug: paramCase(name),
    name
  };

  const dg = Object.assign({}, _dg, {
    id: hasha(JSON.stringify(_dg))
  });

  deploymentGroups.push(dg);

  return Promise.resolve(dg);
};

const deleteDeploymentGroup = options => {
  const dgId = options.id;
  const deleteDeploymentGroup = getServices({ deploymentGroupId: dgId })
    .then(services =>
      Promise.all(
        services.map(service =>
          handleStatusUpdateRequest(
            service.id,
            'DELETING',
            'STOPPING',
            'DELETED',
            'DELETED'
          )
        )
      )
    )
    .then(() => {
      const deploymentGroup = deploymentGroups
        .filter(dg => dg.id === dgId)
        .shift();
      deploymentGroup.status = 'DELETING';
      return deploymentGroup;
      return { deploymentGroupId: dgId };
      return getDeploymentGroups({ id: dgId });
    });

  const timeout = setTimeout(() => {
    const deploymentGroup = deploymentGroups
      .filter(dg => dg.id === dgId)
      .shift();
    deploymentGroup.status = 'DELETED';
  }, 5000);

  return Promise.resolve(deleteDeploymentGroup);
};

const createServicesFromManifest = ({ deploymentGroupId, raw }) => {
  const manifest = yaml.safeLoad(raw);

  Object.keys(manifest).forEach(name => {
    const _service = {
      deploymentGroupId,
      slug: paramCase(name),
      name
    };

    const service = Object.assign({}, _service, {
      id: hasha(JSON.stringify(_service))
    });

    const _instance = {
      name: camelCase(`${service.slug}_01`),
      serviceId: service.id,
      deploymentGroupId
    };

    const instance = Object.assign({}, _instance, {
      id: hasha(JSON.stringify(_instance))
    });

    services.push(service);
    instances.push(instance);
  });

  return Promise.resolve(undefined);
};

const scale = ({ serviceId, replicas }) => {
  const serviceIndex = findIndex(services, ['id', serviceId]);
  const currentScale = instances.filter(
    find({
      serviceId
    })
  ).length;

  const version = {
    id: uuid()
  };

  if (currentScale === replicas) {
    return version;
  }

  services[serviceIndex].status = 'SCALING';

  const up = n => {
    buildArray(n).forEach((_, i) => {
      const instance = {
        name: `${services[serviceIndex].slug}_${currentScale + i}`,
        serviceId,
        deploymentGroupId: services[serviceIndex].deploymentGroupId,
        status: 'ACTIVE',
        healthy: 'UNKNOWN'
      };

      instances.push(
        Object.assign({}, instance, {
          id: hasha(JSON.stringify(instance))
        })
      );
    });
  };

  const down = n => {
    buildArray(n).forEach((_, i) => {
      instances.splice(findIndex(instances, ['serviceId', serviceId]), 1);
    });
  };

  setTimeout(() => {
    const diff = replicas - currentScale;

    if (diff >= 0) {
      up(diff);
    } else {
      down(Math.abs(diff));
    }

    services[serviceIndex].status = 'ACTIVE';
  }, random(1500, 3000));

  return version;
};

const updateInstancesStatus = (is, status) => {
  is.forEach(i => {
    const instance = instances.filter(instance => instance.id === i.id)[0];
    instance.status = status;
  });
  return null;
};

const updateServiceStatus = (ss, status) => {
  ss.forEach(s => {
    const service = services.filter(service => service.id === s.id)[0];
    service.status = status;
  });
  return null;
};

const updateServiceAndInstancesStatus = (
  serviceId,
  serviceStatus,
  instancesStatus
) => {
  return Promise.all([
    getServices({ id: serviceId }),
    getServices({ parentId: serviceId })
  ])
    .then(services =>
      services.reduce((services, service) => services.concat(service), [])
    )
    .then(services => {
      updateServiceStatus(services, serviceStatus);
      return Promise.all(
        services.reduce(
          (instances, service) =>
            service.instances
              ? instances.concat(service.instances())
              : instances,
          []
        )
      ).then(instances =>
        updateInstancesStatus(
          instances.reduce((is, i) => is.concat(i), []),
          instancesStatus
        )
      );
    })
    .then(() =>
      Promise.all([
        getUnfilteredServices({ id: serviceId }),
        getUnfilteredServices({ parentId: serviceId })
      ])
    )
    .then(services =>
      services.reduce((services, service) => services.concat(service), [])
    );
};

const handleStatusUpdateRequest = (
  serviceId,
  transitionalServiceStatus,
  transitionalInstancesStatus,
  serviceStatus,
  instancesStatus
) => {
  // this is what we need to delay
  const timeout = setTimeout(() => {
    updateServiceAndInstancesStatus(serviceId, serviceStatus, instancesStatus);
  }, 5000);
  // this is what we'll need to return
  return updateServiceAndInstancesStatus(
    serviceId,
    transitionalServiceStatus,
    transitionalInstancesStatus
  );
};

const deleteServices = options => {
  // service transitional 'DELETING'
  // instances transitional 'STOPPING'
  // service 'DELETED'
  // instances 'DELETED'
  const deleteService = handleStatusUpdateRequest(
    options.ids[0],
    'DELETING',
    'STOPPING',
    'DELETED',
    'DELETED'
  );
  return Promise.resolve(deleteService);
};

const stopServices = options => {
  // service transitional 'STOPPING'
  // instances transitional 'STOPPING'
  // service 'STOPPED'
  // instances 'STOPPED'
  const stopService = handleStatusUpdateRequest(
    options.ids[0],
    'STOPPING',
    'STOPPING',
    'STOPPED',
    'STOPPED'
  );
  return Promise.resolve(stopService);
};

const startServices = options => {
  // service transitional ...
  // instances transitional ...
  // service 'ACTIVE'
  // instances 'RUNNING'
  const startService = handleStatusUpdateRequest(
    options.ids[0],
    'PROVISIONING',
    'PROVISIONING',
    'ACTIVE',
    'RUNNING'
  );
  return Promise.resolve(startService);
};

const restartServices = options => {
  // service transitional 'RESTARTING'
  // instances transitional 'STOPPING'
  // service 'ACTIVE'
  // instances 'RUNNING'
  const restartService = handleStatusUpdateRequest(
    options.ids[0],
    'RESTARTING',
    'STOPPING',
    'ACTIVE',
    'RUNNING'
  );
  return Promise.resolve(restartService);
};

module.exports = {
  portal: getPortal,
  deploymentGroups: getDeploymentGroups,
  deploymentGroup: query => getDeploymentGroups(query).then(dgs => dgs.shift()),
  services: getServices,
  service: query => getServices(query).then(services => services.shift()),
  instances: getInstances,
  instance: query => getInstances(query).then(instances => instances.shift()),
  createDeploymentGroup,
  provisionManifest: options =>
    createServicesFromManifest(options).then(() => ({
      id: hasha(JSON.stringify(options)),
      type: options.type,
      format: options.format
    })),
  deleteDeploymentGroup: (options, request, fn) =>
    fn(null, deleteDeploymentGroup(options)),
  deleteServices: (options, request, fn) => fn(null, deleteServices(options)),
  scale: (options, reguest, fn) => fn(null, scale(options)),
  restartServices: (options, request, fn) => fn(null, restartServices(options)),
  stopServices: (options, request, fn) => fn(null, stopServices(options)),
  startServices: (options, request, fn) => fn(null, startServices(options))
};
