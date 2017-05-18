import hapi from 'hapi';
import {
  graphqlHapi,
  graphiqlHapi
} from 'graphql-server-hapi';
import schema from './schema';

const server = new hapi.Server();

const HOST = 'localhost';
const PORT = 3000;

server.connection({
    host: HOST,
    port: PORT,
});

server.register({
    register: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: schema,
      },
      route: {
        cors: true
      }
    },
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
