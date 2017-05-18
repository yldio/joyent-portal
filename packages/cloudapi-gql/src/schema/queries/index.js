const { GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    account: require('./account'),
    users: require('./users'),
    policies: require('./policies'),
    roles: require('./roles'),
    datacenters: require('./datacenters'),
    services: require('./services'),
    images: require('./images'),
    packages: require('./packages'),
    machines: require('./machines'),
    firewallRules: require('./firewall-rules'),
    // Fabrics: require('./fabrics')
    networks: require('./networks')
    // Nics: require('./nics')
  }
});
