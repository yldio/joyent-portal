const graphql = require('graphql');
const mutation = require('./mutations');
const query = require('./queries');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query,
  mutation
});
