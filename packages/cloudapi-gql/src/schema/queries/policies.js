const PolicyType = require('../types/policy');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(PolicyType),
  args: {
    id: {
      type: GraphQLID,
      description: '`id` of the `PolicyType` to filter'
    }
  },
  resolve(root, args) {
    const { list, get } = api.policies;

    return args.id ? get(args).then(policy => [policy]) : list();
  }
};
