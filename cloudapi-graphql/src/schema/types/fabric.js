const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'FabricsType',
  fields: {
    name: {
      type: GraphQLString,
      description: 'A unique name to identify the VLAN'
    },
    vlan_id: {
      type: GraphQLInt,
      description: 'A number from 0-4095 that indicates the VLAN\'s id'
    },
    description: {
      type: GraphQLString,
      description: 'An optional description of the VLAN'
    }
  }
});
