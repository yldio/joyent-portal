'use strict';

const Data = require('portal-api/lib/data');
const Fs = require('fs');
const Path = require('path');
const Piloted = require('piloted');
const Triton = require('triton');
const Url = require('url');



let bootstrapped = false;
let timeoutId;
const loadConfig = function () {
  const docker = Piloted.service('docker-compose-api');
  const rethink = Piloted.service('rethinkdb');

  if (docker && rethink && !bootstrapped) {
    bootstrapped = true;
    bootstrap({ docker, rethink });
  } else if (!bootstrapped && !timeoutId) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      Piloted.refresh();
    }, 1000);
  }
};

Piloted.on('refresh', () => {
  loadConfig();
});


const bootstrap = function ({ docker, rethink }) {
  const settings = {
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
  };

  const data = new Data(settings);
  const region = process.env.TRITON_DC || 'us-sw-1';

  data.connect(err => {
    handlerError(err);

    data.createDatacenter({ region, name: region }, (err, datacenter) => {
      handlerError(err);

      Triton.createClient(
        {
          profile: settings.triton
        },
        (err, { cloudapi }) => {
          handlerError(err);

          cloudapi.getAccount((err, { firstName, lastName, email, login }) => {
            handlerError(err);

            data.createUser(
              { firstName, lastName, email, login },
              (err, user) => {
                handlerError(err);

                data.createPortal(
                  {
                    user,
                    datacenter
                  },
                  (err, portal) => {
                    handlerError(err);
                    console.log('data bootstrapped');
                    process.exit(0);
                  }
                );
              }
            );
          });
        }
      );
    });
  });
};

const handlerError = function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

loadConfig();
