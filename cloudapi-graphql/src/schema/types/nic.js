const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NicType',
  description: 'Logical networks are used both on head nodes and compute nodes, and are associated with physical interfaces by using a system called NIC Tags',
  fields: {
    ip: {
      type: GraphQLString,
      description: 'NIC\'s IPv4 address'
    },
    mac: {
      type: GraphQLString,
      description: 'NIC\'s MAC address'
    },
    primary: {
      type: GraphQLBoolean,
      description: 'Whether this is the instance\'s primary NIC',
      resolve: (root) => {
        return root.primary;
      }
    },
    netmask: {
      type: GraphQLString,
      description: 'IPv4 netmask'
    },
    gateway: {
      type: GraphQLString,
      description: 'IPv4 gateway'
    },
    state: {
      type: GraphQLString,
      description: 'Describes the state of the NIC (e.g. provisioning, running, or stopped)'
    },
    network: {
      type: GraphQLString,
      description: 'The NIC\'s network id (see ListNetworks)'
    }
  }
});
