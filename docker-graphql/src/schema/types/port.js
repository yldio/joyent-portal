const { GraphQLString, GraphQLObjectType, GraphQLInt } = require('graphql');
const DynamicObjectType = require('./dynamic-object');
const fromPascalCase = require('./from-pascal-case');

module.exports = new GraphQLObjectType({
  name: 'PortType',
  fields: {
    ip: {
      type: GraphQLString,
      resolve: fromPascalCase
    },
    privatePort: {
      type: GraphQLInt,
      resolve: fromPascalCase
    },
    publicPort: {
      type: GraphQLInt,
      resolve: fromPascalCase
    },
    type: {
      type: GraphQLString,
      resolve: fromPascalCase
    }
  }
});
