const DynamicObjectType = require('./dynamic-object');
const fromPascalCase = require('./from-pascal-case');
const PortType = require('./port');

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ContainerType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: fromPascalCase
    },
    created: {
      type: GraphQLInt,
      resolve: fromPascalCase
    },
    command: {
      type: GraphQLString,
      resolve: fromPascalCase
    },
    names: {
      type: new GraphQLList(GraphQLString),
      resolve: fromPascalCase
    },
    status: {
      type: GraphQLString,
      resolve: fromPascalCase
    },
    image: {
      type: GraphQLString,
      resolve: fromPascalCase
    },
    labels: {
      type: DynamicObjectType,
      resolve: fromPascalCase
    },
    ports: {
      type: new GraphQLList(PortType),
      resolve: fromPascalCase
    }
  }
});
