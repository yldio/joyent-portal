const Pkg = require('../../package.json');

const internals = {
  response: {
    version: Pkg.version
  }
};

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/ops/version',
    config: {
      description: 'Returns the version of the server',
      handler: (request, reply) => reply(internals.response)
    }
  });
};
