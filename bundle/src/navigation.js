const Main = require('apr-main');
const Nav = require('hapi-webconsole-nav');
const Url = require('url');
const Server = require('./server');

const Regions = require('../data/regions');
const Categories = require('../data/categories');

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

  await server.register({
    plugin: Nav,
    options: {
      keyPath,
      keyId,
      apiBaseUrl,
      dcName,
      baseUrl,
      regions: Regions,
      categories: Categories
    },
    routes: {
      prefix: `/${PREFIX}`
    }
  });

  await server.start();
});
