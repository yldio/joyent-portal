const Pkg = require('../../../package.json');

const internals = {
  response: {
    version: Pkg.version
  }
};

const random = (max) => Math.floor(Math.random() * max);

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/ops/version',
    config: {
      description: 'Returns the version of the server',
      handler: (request, reply) => {
        setTimeout(() => reply(internals.response), random(1000));
      }
    }
  });
};
