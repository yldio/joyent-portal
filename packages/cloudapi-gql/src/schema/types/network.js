const DynamicObjectType = require('./dynamic-object');

const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NetworkType',
  description:
    'Logical networks in Triton model core network configurations to enable Triton to define Virtual Network Interfaces and IP addresses for instances',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this network'
    },
    name: {
      type: GraphQLString,
      description: 'The network name'
    },
    public: {
      type: GraphQLBoolean,
      description: 'Whether this a public or private (rfc1918) network',
      resolve: root => {
        return Boolean(root.public);
      }
    },
    fabric: {
      type: GraphQLBoolean,
      description: 'Whether this network is created on a fabric',
      resolve: root => {
        return Boolean(root.fabric);
      }
    },
    description: {
      type: GraphQLString,
      description: 'Description of this network'
    },
    subnet: {
      type: GraphQLString,
      description: 'A CIDR formatted string that describes the network'
    },
    provisionStartIp: {
      type: GraphQLString,
      description: 'The first IP on the network that may be assigned'
    },
    provisionEndIp: {
      type: GraphQLString,
      description: 'The last IP on the network that may be assigned'
    },
    gateway: {
      type: GraphQLString,
      description: 'Optional Gateway IP address'
    },
    resolvers: {
      type: new GraphQLList(GraphQLString),
      description: 'Optional Resolver IP addresses'
    },
    routes: {
      type: DynamicObjectType,
      description: 'Optional Static routes for hosts on this network'
    },
    internetNat: {
      type: GraphQLBoolean,
      description: 'Provision internet NAT zone on gateway address',
      resolve: root => {
        return Boolean(root.internetNat);
      }
    }
  }
});
