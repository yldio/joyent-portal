const schema = require('joyent-cp-gql-schema');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi');
const { makeExecutableSchema } = require('graphql-tools');
const Good = require('good');
const Hapi = require('hapi');
const resolvers = require('./resolvers');

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

server.connection({
  port: 3000
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
      register: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema: makeExecutableSchema({
            typeDefs: schema.sync(),
            resolvers
          })
        },
        route: {
          cors: true
        }
      }
    }
  ],
  err => {
    handlerError(err);

    server.start(err => {
      handlerError(err);
      // eslint-disable-next-line no-console
      console.log(`server started at http://0.0.0.0:${server.info.port}`);
    });
  }
);
