const FindIndex = require('lodash.findindex');

module.exports = ({ deploymentGroups = [], services = [], instances = [] }) => {
  const getInstances = serviceId => (opts, cb) => {
    cb(null, instances
      .filter(instance => {
        return instance.serviceId === serviceId;
      })
    );
  };

  const getServices = deploymentGroupId => (opts, cb) => {
    cb(null, services
      .filter(service => {
        return service.deploymentGroupId === deploymentGroupId;
      })
      .map(service => {
        return Object.assign({}, service, {
          instances: getInstances(service.id)
        });
      })
    );
  };

  const getDeploymentGroups = (opts, cb) => {
    cb(null, deploymentGroups
      .map(dg => {
        return Object.assign({}, dg, {
          services: getServices(dg.id)
        });
      })
    );
  };

  const getPortal = (opts, cb) => {
    cb(null, {
      deploymentGroups: getDeploymentGroups
    });
  };

  const updateInstance = (instance, cb) => {
    const instanceIndex = FindIndex(instances, ['id', instance.id]);
    const updatedInstance = Object.assign(
      {},
      instances[instanceIndex],
      instance
    );

    instances[instanceIndex] = updatedInstance;
    return updatedInstance;
  };

  const updateService = (service, cb) => {
    const serviceIndex = FindIndex(service, ['id', service.id]);
    const updatedService = Object.assign({}, services[serviceIndex], service);

    services[serviceIndex] = updateService;
    return updateService;
  };

  return {
    getPortal,
    updateInstance,
    updateService
  };
};

