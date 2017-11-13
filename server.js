'use strict';

const CloudApi = require('cloudapi-gql');
const Crumb = require('crumb');
const Hapi = require('hapi');
const HapiPino = require('hapi-pino');
const Inert = require('inert');
const Path = require('path');
const Sso = require('sso-auth');
const MyJoy = require('./packages/my-joy-beta');


const server = new Hapi.Server();

const handlerError = (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

server.connection({
  port: 80
});

server.register(
  [
    {
      register: Sso,
      options: {
        cookie: {
          password: process.env.COOKIE_PASSWORD,
          isSecure: false,
          domain: 'localhost',
          isHttpOnly: true,
          ttl: 1000 * 60 * 60       // 1 hour
        },
        sso: {
          keyId: process.env.SDC_KEY_ID,
          keyPath: process.env.SDC_KEY_PATH
        }
      }
    },
    {
      register: Crumb,
      options: {
        restful: true,
        cookieOptions: {
          isSecure: false,
          domain: 'localhost',
          isHttpOnly: false,
          ttl: 1000 * 60 * 60       // 1 hour
        }
      }
    },
    {
      register: HapiPino,
      options: {
        prettyPrint: true,
        logEvents: ['request-error', 'error', 'graqhql-error']
      }
    },
    Inert,
    CloudApi,
    MyJoy
  ],
  (err) => {
    handlerError(err);

    server.auth.default('sso');

    server.start((err) => {
      handlerError(err);
      // eslint-disable-next-line no-console
      console.log(`server started at http://localhost:${server.info.port}`);
    });
  }
);
