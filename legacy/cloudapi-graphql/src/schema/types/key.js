const { GraphQLString, GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'KeyType',
  fields: {
    name: {
      type: GraphQLString
    },
    fingerprint: {
      type: GraphQLString
    },
    key: {
      type: GraphQLString
    }
  }
});
