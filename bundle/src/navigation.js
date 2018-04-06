require('../.env.js');

const Main = require('apr-main');
const Nav = require('hapi-webconsole-nav');
const Graphi = require('graphi');
const Url = require('url');

const Server = require('./server');
const Ui = require('my-joy-navigation');

const Regions = require('../data/regions');
const Categories = require('../data/categories');
const Account = require('../data/account');

const {
  PORT = 4001,
  BASE_URL = `http://0.0.0.0:${PORT}`,
  PREFIX = 'navigation',
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
const baseUrl = BASE_URL;

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
      plugin: Nav,
      options: {
        keyPath,
        keyId,
        apiBaseUrl,
        dcName,
        baseUrl,
        regions: Regions,
        accountServices: Account,
        categories: Categories
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
