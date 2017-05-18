const FabricType = require('../types/fabrics');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList } = graphql;

module.exports = {
  type: new GraphQLList(FabricType),
  resolve() {
    return api.fabrics.list();
  }
};
