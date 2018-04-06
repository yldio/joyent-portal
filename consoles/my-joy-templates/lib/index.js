const Inert = require('inert');
const Path = require('path');
const RenderReact = require('hapi-render-react');
const Intercept = require('apr-intercept');
const Fs = require('mz/fs');

const { NAMESPACE = 'templates' } = process.env;

exports.register = async server => {
  const relativeTo = Path.join(__dirname, 'app');
  const buildRoot = Path.join(__dirname, `../build/${NAMESPACE}/static/`);
  const publicRoot = Path.join(__dirname, `../public/static/`);

  await server.register([
    {
      plugin: Inert
    },
    {
      plugin: RenderReact
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

        const publicPathname = Path.join(publicRoot, rest);
        const buildPathname = Path.join(buildRoot, rest);

        const [err] = await Intercept(
          Fs.access(publicPathname, Fs.constants.R_OK)
        );

        const file = err ? buildPathname : publicPathname;
        return h.file(file, { confine: false });
      }
    },
    {
      method: '*',
      path: `/${NAMESPACE}/~server-error`,
      handler: {
        view: {
          name: 'server-error',
          relativeTo
        }
      }
    },
    {
      method: '*',
      path: `/${NAMESPACE}/{path*}`,
      handler: {
        view: {
          name: 'app',
          relativeTo
        }
      }
    }
  ]);
};

exports.pkg = require('../package.json');
