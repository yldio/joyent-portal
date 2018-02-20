const Inert = require('inert');
const Path = require('path');
const RenderReact = require('hapi-render-react');
const Wreck = require('wreck');
const Url = require('url');

exports.register = async server => {
  await server.register([
    {
      plugin: Inert
    },
    {
      plugin: RenderReact,
      options: {
        relativeTo: Path.join(__dirname, 'app')
      }
    }
  ]);

  server.route([
    {
      method: 'GET',
      path: '/service-worker.js',
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
      path: '/favicon.ico',
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
      path: '/font/{pathname*}',
      config: {
        auth: false,
        handler: async (request, h) => {
          const { params } = request;
          const { pathname } = params;

          const location = Url.format({
            protocol: 'https:',
            slashes: true,
            host: 'fonts.gstatic.com',
            pathname
          });

          const res = await Wreck.request('GET', location);
          return h.response(res);
        }
      }
    },
    {
      method: 'GET',
      path: '/fonts/css',
      config: {
        auth: false,
        handler: async (request, h) => {
          const { query, headers } = request;
          const { family } = query;
          const { host } = headers;
          const url = Url.parse(`http://${host}`);

          const location = Url.format({
            protocol: 'https:',
            slashes: true,
            host: 'fonts.googleapis.com',
            pathname: '/css',
            query: { family }
          });

          const res = await Wreck.request('GET', location);
          const body = await Wreck.read(res);

          const _body = body.toString().replace(
            /https:\/\/fonts\.gstatic\.com/g,
            `http://${url.host}/font`
          );

          return h
            .response(_body)
            .header('content-type', res.headers['content-type'])
            .header('expires', res.headers.expires)
            .header('date', res.headers.date)
            .header('cache-control', res.headers['cache-control']);
        }
      }
    },
    {
      method: 'GET',
      path: '/static/{path*}',
      config: {
        auth: false,
        handler: {
          directory: {
            path: Path.join(__dirname, '../build/static/'),
            redirectToSlash: true,
            index: false
          }
        }
      }
    },
    {
      method: '*',
      path: '/~server-error',
      handler: {
        view: {
          name: 'server-error'
        }
      }
    },
    {
      method: '*',
      path: '/{path*}',
      handler: {
        view: {
          name: 'app'
        }
      }
    }
  ]);
};

exports.pkg = require('../package.json');
