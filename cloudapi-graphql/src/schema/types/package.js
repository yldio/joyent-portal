const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'PackageType',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this package'
    },
    name: {
      type: GraphQLString,
      description: 'The "friendly" name for this package'
    },
    memory: {
      type: GraphQLInt,
      description: 'How much memory will by available (in MiB)'
    },
    disk: {
      type: GraphQLInt,
      description: 'How much disk space will be available (in MiB)'
    },
    swap: {
      type: GraphQLInt,
      description: 'How much swap space will be available (in MiB)'
    },
    lwps: {
      type: GraphQLInt,
      description: 'Maximum number of light-weight processes (threads) allowed'
    },
    vcpus: {
      type: GraphQLInt,
      description: 'Number of vCPUs for this package'
    },
    version: {
      type: GraphQLString,
      description: 'The version of this package'
    },
    group: {
      type: GraphQLString,
      description: 'The group this package belongs to'
    },
    description: {
      type: GraphQLString,
      description: 'A human-friendly description about this package'
    }
  }
});
