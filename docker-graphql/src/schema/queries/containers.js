const DynamicObjectType = require('../types/dynamic-object');
const ContainerType = require('../types/container');
const api = require('../../api');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');

module.exports = {
  type: new GraphQLList(ContainerType),
  args: {
    all: {
      type: GraphQLBoolean,
      description: 'Show all containers. Only running containers are shown by default (i.e., this defaults to false)',
      resolve: root => !!root.all
    },
    limit: {
      type: GraphQLInt,
      description: 'Show `limit` last created containers, include non-running ones'
    },
    since: {
      type: GraphQLID,
      description: 'Show only containers created since `id`, include non-running ones'
    },
    before: {
      type: GraphQLID,
      description: 'Show only containers created before `id`, include non-running ones'
    },
    size: {
      type: GraphQLBoolean,
      description: 'Show the containers sizes'
    },
    filters: {
      type: DynamicObjectType,
      description: 'Filters to process on the containers list'
    }
  },
  resolve(root, args) {
    const { list } = api.containers;
    return list(args);
    //
    // const { after, first } = args;
    //
    // const newArgs = Object.assign(args, {
    //   limit: first,
    //   offset: after
    // });
    //
    // return args.id
    //   ? get({
    //       id: args.id
    //     }).then(machine => [machine])
    //   : list(newArgs);
  }
};
