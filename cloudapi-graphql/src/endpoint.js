const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = graphqlHTTP(() => ({
  schema: schema,
  graphiql: true,
  pretty: true
}));
