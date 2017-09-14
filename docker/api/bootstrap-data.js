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

  const retry = () => {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      Piloted.refresh();
    }, 1000);
  };

  if (docker && rethink) {
    bootstrap({ docker, rethink }, (err) => {
      if (err) {
        console.error(err);
        return retry();
      }

      process.exit(0);
    });
  } else if (!timeoutId) {
    retry();
  }
};

Piloted.on('refresh', () => {
  loadConfig();
});


const bootstrap = function ({ docker, rethink }, cb) {
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

  data.connect((err) => {
    if (err) {
      return cb(err);
    }

    data.getDatacenters((err, datacenters) => {
      if (err) {
        return cb(err);
      }

      // Don't continue since data is already bootstrapped
      if (datacenters && datacenters.length) {
        return cb();
      }

      data.createDatacenter({
        region,
        name: region
      }, (err, datacenter) => {
        if (err) {
          return cb(err);
        }

        Triton.createClient({
          profile: settings.triton
        }, (err, { cloudapi }) => {
          if (err) {
            return cb(err);
          }

          cloudapi.getAccount((err, {
            id,
            firstName,
            lastName,
            email,
            login
          }) => {
            if (err) {
              return cb(err);
            }

            data.createUser({
              tritonId: id,
              firstName,
              lastName,
              email,
              login
            }, (err, user) => {
              if (err) {
                return cb(err);
              }

              data.createPortal({
                user,
                datacenter
              }, (err, portal) => {
                if (err) {
                  return cb(err);
                }

                console.log('data bootstrapped');
                cb();
              });
            });
          });
        });
      });
    });
  });
};

loadConfig();
