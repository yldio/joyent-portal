const { v4: uuid } = require('uuid');
const paramCase = require('param-case');
const camelCase = require('camel-case');
const yaml = require('js-yaml');

const {
  datacenter,
  portal,
  deploymentGroups,
  services,
  instances
} = require('./data.json');

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
      instances: instancesResolver(service)
    });

  return Promise.resolve(
    services.filter(find(cleanQuery(query))).map(addNestedResolvers)
  );
};

const getServices = query => {
  const services = getUnfilteredServices(query)
    .then(services => {
      // loop through services and for each of them get all services that's parent id is the service
      // once done - this will be a Promise all - need to remove any duplicates from the services list - the original
      // then we can do below...
      return (
        Promise.all(
          services.map(service => getUnfilteredServices({ parent: service.id }))
        )
          // this is going to be an array of arrays of services
          .then(childServices => {
            return childServices.reduce((childServices, childService) => {
              return childServices.concat(childService);
            }, []);
          })
          // now it's at least flat
          .then(childServices => {
            return services.concat(
              childServices.reduce((childServices, childService) => {
                const exists = services.filter(
                  service => service.id === childService.id
                ).length;
                if (!exists) {
                  childServices.push(childService);
                }
                return childServices;
              }, [])
            );
          })
          .then(services => {
            return Promise.all(
              services.map(service => service.instances())
            ).then(instances => {
              return { services, instances };
            });
          })
      );
    })
    .then(({ services, instances }) => {
      const activeServices = services.reduce((services, service, index) => {
        const active = instances[index].filter(
          instance =>
            instance.status !== 'DELETED' && instance.status !== 'EXITED'
        ).length;
        if (active) {
          services.push(service);
        }
        return services;
      }, []);
      const allServices = activeServices.reduce((allServices, service) => {
        if (service.parent) {
          const parentService = services.filter(s => s.id === service.parent);
          const exists = allServices.filter(s => s.id === service.parent)
            .length;
          if (!exists && parentService) {
            allServices.push(parentService[0]);
          }
        }
        allServices.push(service);
        return allServices;
      }, []);
      return allServices;
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
  const dg = {
    id: uuid(),
    slug: paramCase(name),
    name
  };

  deploymentGroups.push(dg);

  return Promise.resolve(dg);
};

const createServicesFromManifest = ({ deploymentGroupId, raw }) => {
  const manifest = yaml.safeLoad(raw);

  Object.keys(manifest).forEach(name => {
    const service = {
      id: uuid(),
      deploymentGroup: deploymentGroupId,
      slug: paramCase(name),
      name
    };

    const instance = {
      id: uuid(),
      name: camelCase(`${service.slug}_01`),
      service: service.id,
      deploymentGroup: deploymentGroupId
    };

    services.push(service);
    instances.push(instance);
  });

  return Promise.resolve(undefined);
};

const scale = options => {
  const service = getServices({ id: options.serviceId })[0];

  return {
    scale: [
      {
        id: service.id,
        serviceName: service.name,
        replicas: 2
      }
    ]
  };
};

const restartServices = options => {
  const service = getServices({ id: options.ids[0] });
  return service;
};

const updateInstancesStatus = (is, status) => {
  is.forEach(i => {
    const instance = instances.filter(instance => instance.id === i.id)[0];
    instance.status = status;
  });

  return null;
};

const updateServiceStatus = (serviceId, status) => {
  return Promise.all([getServices({ id: serviceId }), getServices({ parentId: serviceId })])
    .then(services => services.reduce((services, service) =>
      services.concat(service), []))
    .then(services => Promise.all(
      services.reduce((instances, service) =>
        service.instances ? instances.concat(service.instances()) : instances, [])))
    .then(instances => updateInstancesStatus(instances.reduce((is, i) =>
      is.concat(i), []), status))
    .then(() => Promise.all([
      getServices({ id: serviceId }),
      getServices({ parentId: serviceId })
    ]))
    .then(services => services.reduce((services, service) =>
        services.concat(service), []));
};

const deleteServices = options => {
  const serviceId = options.ids[0];
  const deleteService = getServices({ id: serviceId }).then(services => {
    const service = services.shift();
    return service.instances().then(instances => {
      if (instances.length) {
        updateInstancesStatus(instances, 'DELETED');
        return [service];
      }

      return getUnfilteredServices({ parent: serviceId }).then(services => {
        return Promise.all(
          services.map(service => service.instances())
        ).then(instances => {
          const is = instances.reduce((is, i) => is.concat(i), []);
          updateInstancesStatus(is, 'DELETED');
          return [service];
        });
      });
    });
  });
  return Promise.resolve(deleteService);
};

const stopServices = options => {
  const stopService = updateServiceStatus(options.ids[0], 'STOPPED');
  return Promise.resolve(stopService);
};

const startServices = options => {
  const startService = updateServiceStatus(options.ids[0], 'RUNNING');
  return Promise.resolve(startService);
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
      id: uuid(),
      type: options.type,
      format: options.format
    })),
  deleteServices: (options, request, fn) => fn(null, deleteServices(options)),
  scale: (options, reguest, fn) => fn(null, scale(options)),
  restartServices: (options, request, fn) => fn(null, restartServices(options)),
  stopServices: (options, request, fn) => fn(null, stopServices(options)),
  startServices: (options, request, fn) => fn(null, startServices(options))
};
