const prom = require('../prom');

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/metrics',
    handler: (req, reply) => {
      console.log('before metrics');
      reply(prom()).type('text/plain')
      console.log('after metrics');
    }
  });
};
