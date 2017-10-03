const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');

const resolvers = require('./resolvers');
const typeDefs = readFileSync(
  path.join(__dirname, './schema.graphql'),
  'utf-8'
);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;
