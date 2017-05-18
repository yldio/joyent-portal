const path = require('path');

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file(path.join(__dirname, 'index.html'));
    }
  });
};
