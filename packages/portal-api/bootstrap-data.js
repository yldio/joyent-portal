'use strict';

const Triton = require('triton');
const Url = require('url');
const Path = require('path');
const Fs = require('fs');

const Data = require('./lib/data');

const {
  DOCKER_HOST,
  DOCKER_CERT_PATH,
  SDC_URL,
  SDC_ACCOUNT,
  SDC_KEY_ID
} = process.env;

const DOCKER_HOST_URL = DOCKER_HOST ?
  Url.parse(DOCKER_HOST) :
  {};

const settings = {
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
  },
  triton: {
    url: SDC_URL,
    account: SDC_ACCOUNT,
    keyId: SDC_KEY_ID
  }
};

const ifError = function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
};

const bootstrap = function (cb) {
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

bootstrap(ifError);
