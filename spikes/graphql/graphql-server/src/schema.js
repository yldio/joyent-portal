import path from 'path';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
