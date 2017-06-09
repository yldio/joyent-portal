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

const getServiceInstances = s =>
  Object.assign({}, s, {
    instances: instances.filter(find({ service: s.id })).map(s =>
      Object.assign({}, s, {
        slug: s.name
      })
    )
  });

const getDeploymentGroupServices = dg =>
  Object.assign({}, dg, {
    services: services
      .filter(find({ deploymentGroup: dg.id }))
      .map(getServiceInstances)
  });

const getDeploymentGroups = query =>
  deploymentGroups
    .filter(find(cleanQuery(query)))
    .map(getDeploymentGroupServices);

const getPortal = () =>
  Object.assign({}, portal, {
    datacenter,
    deploymentGroups: getDeploymentGroups()
  });

const getServices = query =>
  services.filter(find(query)).map(getDeploymentGroupServices);

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
  portal: (options, request, fn) => fn(null, getPortal()),
  deploymentGroups: (options, request, fn) =>
    fn(null, getDeploymentGroups(options)),
  deploymentGroup: (options, request, fn) =>
    fn(null, getDeploymentGroups(options).shift()),
  services: (options, request, fn) => fn(null, getServices()),
  service: (options, request, fn) => fn(null, getServices(options).shift()),
  createDeploymentGroup,
  provisionManifest: options =>
    createServicesFromManifest(options).then(() => ({
      id: uuid(),
      type: options.type,
      format: options.format
    }))
};
