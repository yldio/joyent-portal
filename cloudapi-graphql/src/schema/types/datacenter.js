const {
  GraphQLString,
  GraphQLObjectType
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'DatacenterType',
  fields: {
    name: {
      type: GraphQLString,
      description: 'location of the datacenter'
    },
    url: {
      type: GraphQLString
    }
  }
});
