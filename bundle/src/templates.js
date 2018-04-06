const Main = require('apr-main');
const Url = require('url');
const Tsg = require('tsg-graphql');

const Server = require('./server');

const {
  PORT = 4005,
  BASE_URL = `http://0.0.0.0:${PORT}`,
  PREFIX = 'templates',
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

  await server.register({
    plugin: Tsg,
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
  });

  await server.start();
});
