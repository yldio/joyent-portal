'use strict';

const Brule = require('brule');
const Hapi = require('hapi');
const Rollover = require('rollover');
const Brok = require('brok');
const { homedir } = require('os');
const { join } = require('path');

const Sso = require('hapi-triton-auth');
const Nav = require('my-joy-navigation');
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
  // CONSOLE = 'my-joy-instances'
} = process.env;

const Ui = require('my-joy-instances');
// const Instances = require('my-joy-instances');
// const Images = require('my-joy-images');

const server = Hapi.server({
  compression: {
    minBytes: 1
  },
  debug: {
    request: ['error']
  },
  port: PORT,
  host: '127.0.0.1'
});

async function main() {
  await server.register([
    {
      plugin: Brok
    },
    {
      plugin: Rollover,
      options: {
        rollbar: {
          accessToken: ROLLBAR_SERVER_TOKEN,
          reportLevel: 'error'
        }
      }
    },
    {
      plugin: Brule,
      options: {
        auth: false
      }
    },
    {
      plugin: Sso,
      options: {
        ssoUrl: 'https://sso.joyent.com',
        baseUrl: BASE_URL,
        apiBaseUrl: SDC_URL,
        keyId: '/' + SDC_ACCOUNT + '/keys/' + SDC_KEY_ID,
        keyPath: SDC_KEY_PATH || join(homedir(), '.ssh/id_rsa'),
        permissions: { cloudapi: ['/my/*'] },
        isDev: NODE_ENV === 'development',
        cookie: {
          isHttpOnly: true,
          isSecure: false,
          password: COOKIE_PASSWORD,
          ttl: 1000 * 60 * 60, // 1 hour
          domain: COOKIE_DOMAIN
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
      plugin: Api,
      options: {
        keyId: '/' + SDC_ACCOUNT + '/keys/' + SDC_KEY_ID,
        keyPath: SDC_KEY_PATH || join(homedir(), '.ssh/id_rsa'),
        apiBaseUrl: SDC_URL
      }
    }
  ]);

  server.auth.default('sso');

  process.on('unhandledRejection', err => {
    server.log(['error'], err);
  });

  await server.start();
  console.log(`server started at http://localhost:${server.info.port}`);
}

main();
