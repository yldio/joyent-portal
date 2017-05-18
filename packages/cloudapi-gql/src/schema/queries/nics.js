const NicType = require('../types/nic');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLString } = graphql;

module.exports = {
  type: new GraphQLList(NicType),
  args: {
    mac: {
      type: GraphQLString
    }
  },
  resolve(root, args) {
    const { list, get } = api.nics;

    return args.id ? get(args).then(nic => [nic]) : list();
  }
};
