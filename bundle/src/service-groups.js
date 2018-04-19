const Main = require('apr-main');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools');
const Graphi = require('graphi');
const Url = require('url');
const Path = require('path');
const Fs = require('fs');

const Server = require('./server');

const {
  PORT = 4004,
  BASE_URL = `http://0.0.0.0:${PORT}`,
  PREFIX = 'service-groups'
} = process.env;

const ServiceGroupsGql = {
  name: 'tsg-gql',
  register: async server => {
    const typeDefs = Fs.readFileSync(
      Path.join(__dirname, 'tsg.graphql'),
      'utf-8'
    );

    const schema = makeExecutableSchema({
      typeDefs
    });

    addMockFunctionsToSchema({ schema });

    const graphiOptions = {
      graphiqlPath: '/graphiql',
      schema
    };

    await server.register({
      plugin: Graphi,
      options: graphiOptions
    });
  }
};

Main(async () => {
  const server = await Server({
    PORT,
    BASE_URL
  });

  await server.register({
    plugin: ServiceGroupsGql,
    routes: {
      prefix: `/${PREFIX}`
    }
  });

  await server.start();
});
