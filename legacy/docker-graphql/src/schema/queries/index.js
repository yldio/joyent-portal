const { GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    containers: require('./containers')
  }
});
