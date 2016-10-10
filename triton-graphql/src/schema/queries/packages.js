const PackageType = require('../types/package');
const graphql = require('graphql');
const api = require('../../api');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLID
} = graphql;

module.exports = {
  type: new GraphQLList(PackageType),
  args: {
    id: {
      type: GraphQLID,
      description: 'Filter on package id'
    },
    name: {
      type: GraphQLString,
      description: 'Filter on the "friendly" name'
    },
    memory: {
      type: GraphQLInt,
      description: 'Filter on how much memory will by available (in MiB)'
    },
    disk: {
      type: GraphQLInt,
      description: 'Filter on how much disk space will be available (in MiB)'
    },
    swap: {
      type: GraphQLInt,
      description: 'Filter on how much swap space will be available (in MiB)'
    },
    lwps: {
      type: GraphQLInt,
      description: 'Filter on maximum number of light-weight processes (threads) allowed'
    },
    vcpus: {
      type: GraphQLInt,
      description: 'Filter on number of vCPUs'
    },
    version: {
      type: GraphQLString,
      description: 'Filter on the version'
    },
    group: {
      type: GraphQLString,
      description: 'Filter on the group belonging to'
    }
  },
  resolve(root, args) {
    const {
      list,
      get
    } = api.packages;

    return args.id ? get({
      id: args.id
    }).then((pkg) => [pkg]) : list(args);
  }
};
