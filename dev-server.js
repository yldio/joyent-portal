'use strict';

// Requires .env.js file with the following exports:
// SDC_URL, SDC_KEY_ID, SDC_KEY_PATH

const CloudApi = require('cloudapi-gql');
const { hapi: Playground } = require('graphql-playground/middleware');
const { hapi: Voyager } = require('graphql-voyager/middleware');
const Hapi = require('hapi');
const HapiPino = require('hapi-pino');
const Inert = require('inert');


const server = new Hapi.Server();

const handlerError = (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

server.connection({
  port: 4000,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    }
  }
});

server.register(
  [
    Inert,
    CloudApi,
    {
      register: Playground,
      options: {
        path: '/playground',
        endpointUrl: '/graphql'
      }
    },
    {
      register: Voyager,
      options: {
        path: '/voyager',
        endpointUrl: '/graphql'
      }
    },
    {
      register: HapiPino,
      options: {
        prettyPrint: true
      }
    }
  ],
  (err) => {
    handlerError(err);

    server.route([
      {
        method: 'GET',
        path: '/doc/{param*}',
        config: {
          handler: {
            directory: {
              path: './doc',
              redirectToSlash: true,
              index: true
            }
          }
        }
      }
    ]);

    server.start((err) => {
      handlerError(err);
      // eslint-disable-next-line no-console
      console.log(`server started at http://0.0.0.0:${server.info.port}`);
    });
  }
);
