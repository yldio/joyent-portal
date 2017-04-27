const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'SnapshotType',
  description: 'Policies are lists of rules that describe access to resources',
  fields: {
    name: {
      type: GraphQLID,
      description: 'The name of this snapshot'
    },
    state: {
      type: GraphQLString,
      description: 'The current state of the snapshot'
    }
  }
});
