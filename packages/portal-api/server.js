'use strict';

const Brule = require('brule');
const Good = require('good');
const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Toppsy = require('toppsy');
const Vision = require('vision');
const Pack = require('./package');
const Portal = require('./lib');
const Path = require('path');
const Fs = require('fs');
const Url = require('url');

const server = new Hapi.Server();
server.connection({ port: 3000 });

const swaggerOptions = {
  info: {
    'title': 'Portal API Documentation',
    'version': Pack.version
  }
};

const {
  DOCKER_HOST,
  DOCKER_CERT_PATH,
  SDC_URL,
  SDC_ACCOUNT,
  SDC_KEY_ID
} = process.env;

const DOCKER_HOST_URL = DOCKER_HOST ? Url.parse(DOCKER_HOST) : {};

const portalOptions = {
  data: {
    db: {
      host: process.env.RETHINK_HOST || 'localhost'
    },
    docker: {
      protocol: 'https',
      host: DOCKER_HOST_URL.hostname,
      port: DOCKER_HOST_URL.port,
      ca: DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(DOCKER_CERT_PATH, 'ca.pem')) :
        undefined,
      cert: DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(DOCKER_CERT_PATH, 'cert.pem')) :
        undefined,
      key: DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(DOCKER_CERT_PATH, 'key.pem')) :
        undefined
    }
  },
  watch: {
    url: SDC_URL,
    account: SDC_ACCOUNT,
    keyId: SDC_KEY_ID
  }
};

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    consoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*', error: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

server.register([
  Brule,
  Inert,
  Vision,
  {
    register: Good,
    options: goodOptions
  },
  {
    register: Portal,
    options: portalOptions
  },
  {
    register: HapiSwagger,
    options: swaggerOptions
  },
  {
    register: Toppsy,
    options: { namespace: 'portal', subsystem: 'api' }
  }
],
  (err) => {
    handlerError(err);
    server.start((err) => {
      handlerError(err);
      console.log(`server started at http://localhost:${server.info.port}`);
    });
  }
);

function handlerError (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
}
