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

const getInstances = query =>
  Promise.resolve(instances.filter(find(cleanQuery(query))));

const getServices = query => {
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
    }))
};
