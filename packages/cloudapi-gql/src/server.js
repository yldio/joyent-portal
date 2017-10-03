const { hapi: Voyager } = require('graphql-voyager/middleware');
const { hapi: Playground } = require('graphql-playground/middleware');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const { formatError } = require('apollo-errors');
const Hapi = require('hapi');
const Good = require('good');
const Path = require('path');
const Inert = require('inert');
const Execa = require('execa');

const schema = require('./schema');

const { CORS, PORT } = process.env;

const server = new Hapi.Server({
  debug: {
    log: ['error'],
    request: ['error']
  }
});

const handlerError = err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

// compile docs
// eslint-disable-next-line new-cap
Execa('npm', ['run', 'graphdoc']).catch(handlerError);

server.connection({
  port: PORT,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, './../doc')
    }
  }
});

server.register(
  [
    {
      register: Good,
      options: {
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    },
    Inert,
    {
      register: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          formatError,
          schema
        },
        route: {
          cors: Boolean(CORS)
        }
      }
    },
    {
      register: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        }
      }
    },
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
    }
  ],
  err => {
    handlerError(err);

    server.route({
      method: 'GET',
      path: '/doc/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    });

    server.start(err => {
      handlerError(err);
      // eslint-disable-next-line no-console
      console.log(`server started at http://0.0.0.0:${server.info.port}`);
    });
  }
);
