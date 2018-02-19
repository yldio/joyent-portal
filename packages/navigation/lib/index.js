const Inert = require('inert');
const Path = require('path');

const ROOT = Path.join(__dirname, '../build');

exports.register = async server => {
  const manifest = require('../build/asset-manifest.json');

  await server.register(Inert);

  server.route([
    {
      method: 'GET',
      path: '/nav-static/{path*}',
      config: {
        auth: false,
        handler: (request, h) => {
          const { params } = request;
          const { path } = params;

          const file = manifest[path];

          if (!file) {
            return h.continue;
          }

          return h.file(Path.join(ROOT, file), {
            confine: ROOT
          });
        }
      }
    }
  ]);
};

exports.pkg = require('../package.json');
