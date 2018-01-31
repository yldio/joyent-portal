

const Brule = require('brule');
const Hapi = require('hapi');
const Inert = require('inert');
const Main = require('apr-main');
const Rollover = require('rollover');

const Sso = require('minio-proto-auth');
const Ui = require('my-joy-beta');
const Nav = require('joyent-navigation');
const Api = require('cloudapi-gql');

const {
  PORT = 3069,
  COOKIE_PASSWORD,
  COOKIE_DOMAIN,
  SDC_KEY_PATH,
  SDC_ACCOUNT,
  SDC_KEY_ID,
  SDC_URL,
  BASE_URL = `http://0.0.0.0:${PORT}`,
  ROLLBAR_SERVER_TOKEN,
  NODE_ENV = 'development'
} = process.env;

const server = Hapi.server({
  port: PORT,
  host: '127.0.0.1'
});

Main(async () => {
  await server.register([
    // {
    //   plugin: Rollover,
    //   options: {
    //     rollbar: {
    //       accessToken: ROLLBAR_SERVER_TOKEN,
    //       reportLevel: 'error'
    //     }
    //   }
    // },
    {
      plugin: Brule,
      options: {
        auth: false
      }
    },
    {
      plugin: Sso,
      options: {
        cookie: {
          password: COOKIE_PASSWORD,
          domain: COOKIE_DOMAIN,
          isSecure: false,
          isHttpOnly: true,
          ttl: 1000 * 60 * 60 // 1 hour
        },
        sso: {
          keyPath: SDC_KEY_PATH,
          keyId: '/' + SDC_ACCOUNT + '/keys/' + SDC_KEY_ID,
          apiBaseUrl: SDC_URL,
          url: 'https://sso.joyent.com/login',
          permissions: { cloudapi: ['/my/*'] },
          baseUrl: BASE_URL,
          isDev: NODE_ENV === 'development'
        }
      }
    },
    {
      plugin: Nav
    },
    {
      plugin: Ui
    },
    {
      plugin: Api
    }
  ]);

  server.auth.default('sso');

  await server.start();
  console.log(`server started at http://localhost:${server.info.port}`);
});
