const RoleType = require('../types/role');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(RoleType),
  args: {
    id: {
      type: GraphQLID,
      description: '`id` or `name` of the `RoleType` to filter'
    }
  },
  resolve(root, args) {
    const { list, get } = api.roles;

    return !args.id ? list() : get(args).then(role => [role]);
  }
};
