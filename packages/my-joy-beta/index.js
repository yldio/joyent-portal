'use strict';

const Path = require('path');
const Package = require('./package.json');


module.exports = function (server, options, next) {
  server.dependency('inert');

  server.route([
    {
      method: 'GET',
      path: '/static/{path*}',
      config: {
        auth: false,
        handler: {
          directory: {
            path: Path.join(__dirname, './build/static/'),
            redirectToSlash: true,
            index: false
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/{path}.json',
      config: {
        auth: false,
        handler: (request, reply) => {
          const path = Path.join(__dirname, `./build/${request.params.path}.json`);
          reply.file(path);
        }
      }
    },
    {
      method: 'GET',
      path: '/service-worker.js',
      config: {
        auth: false,
        handler: (request, reply) => {
          const path = Path.join(__dirname, `./build/service-worker.js`);
          reply.file(path);
        }
      }
    },
    {
      method: '*',
      path: '/{path*}',
      config: {
        handler: {
          file: {
            path: Path.join(__dirname, './build/index.html')
          }
        }
      }
    }
  ]);

  next();
};

module.exports.attributes = {
  pkg: Package
};
