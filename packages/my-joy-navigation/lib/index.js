'use strict';

const Boom = require('boom');
const Inert = require('inert');
const Path = require('path');
const Url = require('url');
const Intercept = require('apr-intercept');
const Fs = require('mz/fs');

const { NAMESPACE = 'navigation' } = process.env;

exports.register = async server => {
  const manifest = require('../build/asset-manifest.json');
  const buildRoot = Path.join(__dirname, '../build');
  const buildStatic = Path.join(buildRoot, `${NAMESPACE}`);
  const publicRoot = Path.join(__dirname, `../public/static`);

  await server.register([
    {
      plugin: Inert
    }
  ]);

  server.route([
    {
      method: 'GET',
      path: `/${NAMESPACE}/service-worker.js`,
      config: {
        auth: false,
        handler: {
          file: {
            path: Path.join(__dirname, '../build/service-worker.js')
          }
        }
      }
    },
    {
      method: 'GET',
      path: `/${NAMESPACE}/favicon.ico`,
      config: {
        auth: false,
        handler: {
          file: {
            path: Path.join(__dirname, '../build/favicon.ico')
          }
        }
      }
    },
    {
      method: 'GET',
      path: `/${NAMESPACE}/static/{rest*}`,
      config: {
        auth: false
      },
      handler: async (request, h) => {
        const { params } = request;
        const { rest } = params;

        if (!rest) {
          return Boom.notFound();
        }

        const publicPathname = Path.join(publicRoot, rest);
        const [err1] = await Intercept(
          Fs.access(publicPathname, Fs.constants.R_OK)
        );

        if (!err1) {
          return h.file(publicPathname, {
            confine: publicRoot
          });
        }

        const filename = manifest[rest];
        if (!filename) {
          return Boom.notFound();
        }

        const buildMapPathname = Path.join(buildRoot, filename);
        const [err2] = await Intercept(
          Fs.access(buildMapPathname, Fs.constants.R_OK)
        );

        if (!err2) {
          return h.file(buildMapPathname, {
            confine: buildStatic
          });
        }

        const buildPathname = Path.join(buildStatic, rest);
        return h.file(buildPathname, {
          confine: buildStatic
        });
      }
    }
  ]);
};

exports.pkg = require('../package.json');
