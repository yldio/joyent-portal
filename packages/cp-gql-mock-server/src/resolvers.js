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
    instances: instances.filter(find({ service: s.uuid })).map(s =>
      Object.assign({}, s, {
        slug: s.name
      })
    )
  });

const getDeploymentGroupServices = dg =>
  Object.assign({}, dg, {
    services: services
      .filter(find({ deploymentGroup: dg.uuid }))
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

module.exports = {
  Query: {
    portal: getPortal,
    deploymentGroups: getDeploymentGroups,
    deploymentGroup: query => getDeploymentGroups(query).shift(),
    services: getServices,
    service: query => getServices(query).shift()
  }
};
