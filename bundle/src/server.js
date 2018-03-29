const Hapi = require('hapi');
const Sso = require('hapi-triton-auth');
const Url = require('url');

const {
  COOKIE_PASSWORD,
  COOKIE_DOMAIN,
  SDC_KEY_PATH,
  SDC_ACCOUNT,
  SDC_KEY_ID,
  SDC_URL,
  DC_NAME
} = process.env;

module.exports = async ({ PORT, BASE_URL }) => {
  const dcName = DC_NAME || Url.parse(SDC_URL).host.split('.')[0];
  const keyPath = SDC_KEY_PATH;
  const keyId = `/${SDC_ACCOUNT}/keys/${SDC_KEY_ID}`;
  const apiBaseUrl = SDC_URL;
  const ssoUrl = 'https://sso.joyent.com/login';
  const baseUrl = BASE_URL;
  const isDev = true;

  const permissions = {
    cloudapi: ['/my/*']
  };

  const cookie = {
    password: COOKIE_PASSWORD,
    domain: COOKIE_DOMAIN,
    isSecure: false,
    isHttpOnly: true,
    ttl: 1000 * 60 * 60 // 1 hour
  };

  const server = Hapi.server({
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['Cookie', 'X-CSRF-Token']
      }
    },
    debug: {
      log: ['error'],
      request: ['error']
    }
  });

  server.events.on('log', (event, tags) => {
    if (tags.error) {
      console.log(event);
    }
  });

  server.events.on('request', (request, event) => {
    const { tags } = event;
    if (tags.includes('error') && event.data && event.data.errors) {
      event.data.errors.forEach(error => {
        console.log(error);
      });
    }
  });

  await server.register({
    plugin: Sso,
    options: {
      keyPath,
      keyId,
      apiBaseUrl,
      ssoUrl,
      permissions,
      baseUrl,
      isDev,
      cookie
    }
  });

  server.auth.default('sso');

  return server;
};
