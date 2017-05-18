const NetworkType = require('../types/network');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(NetworkType),
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve(root, args) {
    const { list, get } = api.networks;

    return !args.id ? list() : get(args).then(network => [network]);
  }
};
