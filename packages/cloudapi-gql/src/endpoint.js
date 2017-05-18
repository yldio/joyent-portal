const { GraphQLSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { query, mutation } = require('./schema');

module.exports = graphqlHTTP(() => ({
  schema: new GraphQLSchema({
    query,
    mutation
  }),
  graphiql: true,
  pretty: true
}));
