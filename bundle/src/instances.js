require('../.env.js');

const Main = require('apr-main');
const CloudApiGql = require('cloudapi-gql');
const Graphi = require('graphi');
const Url = require('url');

const Server = require('./server');
const Ui = require('my-joy-instances');

const {
  PORT = 4002,
  BASE_URL = `http://0.0.0.0:${PORT}`,
  PREFIX = 'instances',
  DC_NAME,
  SDC_URL,
  SDC_KEY_PATH,
  SDC_ACCOUNT,
  SDC_KEY_ID
} = process.env;

const dcName = DC_NAME || Url.parse(SDC_URL).host.split('.')[0];
const keyPath = SDC_KEY_PATH;
const keyId = `/${SDC_ACCOUNT}/keys/${SDC_KEY_ID}`;
const apiBaseUrl = SDC_URL;

Main(async () => {
  const server = await Server({
    PORT,
    BASE_URL
  });

  await server.register([
    {
      plugin: Graphi,
      options: {
        graphqlPath: '/graphql',
        graphiqlPath: '/graphiql',
        authStrategy: 'sso'
      },
      routes: {
        prefix: `/${PREFIX}`
      }
    },
    {
      plugin: CloudApiGql,
      options: {
        authStrategy: 'sso',
        keyPath,
        keyId,
        apiBaseUrl,
        dcName
      },
      routes: {
        prefix: `/${PREFIX}`
      }
    },
    {
      plugin: Ui
    }
  ]);

  await server.start();
});
