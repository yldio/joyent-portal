const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'PolicyType',
  description: 'Policies are lists of rules that describe access to resources',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this policy'
    },
    name: {
      type: GraphQLString,
      description: 'The policy name'
    },
    rules: {
      type: new GraphQLList(GraphQLString),
      description: 'One or more Aperture sentences applying to the policy'
    },
    description: {
      type: GraphQLString,
      description: 'A description for this policy'
    }
  }
});
