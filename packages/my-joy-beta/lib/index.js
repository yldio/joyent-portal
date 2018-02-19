const Inert = require('inert');
const Path = require('path');
const { readFile } = require('mz/fs');

exports.register = async server => {
  const indexFile = await readFile(
    Path.join(__dirname, '../build/index.html'),
    'utf-8'
  );

  await server.register(Inert);

  server.route([
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
      path: '/{path*}',
      config: {
        handler: (request, h) => {
          return h.response(indexFile).type('text/html');
        }
      }
    }
  ]);
};

exports.pkg = require('../package.json');
