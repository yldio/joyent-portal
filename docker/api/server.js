'use strict';

const Brule = require('brule');
const Fs = require('fs');
const Good = require('good');
const Hapi = require('hapi');
const Path = require('path');
const Piloted = require('piloted');
const Portal = require('portal-api');
const Toppsy = require('toppsy');
const Url = require('url');


let started = false;
let timeoutId;
const loadConfig = function () {
  const docker = Piloted.service('docker-compose-api');
  const rethink = Piloted.service('rethinkdb');

  if (docker && rethink && !started) {
    started = true;
    startServer({ docker, rethink });
  } else if (!started && !timeoutId) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      Piloted.refresh();
    }, 1000);
  }
};

Piloted.on('refresh', () => {
  loadConfig();
});


const startServer = function ({ docker, rethink }) {
  const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

  const server = new Hapi.Server();
  server.connection({ port });

  const portalOptions = {
    data: {
      db: {
        host: rethink.address
      },
      docker: {
        protocol: 'https',
        host: docker.address,
        port: docker.port,
        ca: process.env.DOCKER_CERT_PATH
          ? Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'ca.pem'))
          : undefined,
        cert: process.env.DOCKER_CERT_PATH
          ? Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'cert.pem'))
          : undefined,
        key: process.env.DOCKER_CERT_PATH
          ? Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'key.pem'))
          : undefined
      },
      triton: {
        url: process.env.SDC_URL,
        account: process.env.SDC_ACCOUNT,
        keyId: process.env.SDC_KEY_ID
      }
    },
    watch: {
      url: process.env.SDC_URL,
      account: process.env.SDC_ACCOUNT,
      keyId: process.env.SDC_KEY_ID
    }
  };

  const goodOptions = {
    ops: {
      interval: 1000
    },
    reporters: {
      consoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*', error: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  };

  server.register(
    [
      Brule,
      {
        register: Good,
        options: goodOptions
      },
      {
        register: Portal,
        options: portalOptions
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
};

const handlerError = function (err) {
  if (err) {
    console.error(err);
    console.error(err.stack);
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  console.error(err);
  console.error(err.stack);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
  console.error(err.stack);
});

loadConfig();
