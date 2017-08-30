'use strict';

const Data = require('portal-api/lib/data');
const Fs = require('fs');
const Path = require('path');
const Piloted = require('piloted');
const Triton = require('triton');
const Url = require('url');


let timeoutId;
const loadConfig = function () {
  const docker = Piloted.service('docker-compose-api');
  const rethink = Piloted.service('rethinkdb');

  if (docker && rethink) {
    bootstrap({ docker, rethink });
  } else if (!timeoutId) {
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
    if (err) {
      console.error(err);
      return;
    }

    data.createDatacenter({ region, name: region }, (err, datacenter) => {
      if (err) {
        console.error(err);
        return;
      }

      Triton.createClient(
        {
          profile: settings.triton
        },
        (err, { cloudapi }) => {
          if (err) {
            console.error(err);
            return;
          }

          cloudapi.getAccount((err, { firstName, lastName, email, login }) => {
            if (err) {
              console.error(err);
              return;
            }

            data.createUser(
              { firstName, lastName, email, login },
              (err, user) => {
                if (err) {
                  console.error(err);
                  return;
                }

                data.createPortal(
                  {
                    user,
                    datacenter
                  },
                  (err, portal) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

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

loadConfig();
