const {
  GraphQLString,
  GraphQLObjectType
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ServiceType',
  fields: {
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  }
});
