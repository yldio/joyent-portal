const Metric = require('../metric');

module.exports = (server) => {
  const metric = Metric(server);

  server.route({
    method: 'GET',
    path: '/job-tree',
    config: {
      handler: (request, reply) => reply(Metric.tree())
    }
  });

  server.subscription('/stats/{id}', {
    onSubscribe: (socket, path, params, next) => {
      console.log('onSubscribe');
      metric.on(params.id);
      next();
    },
    onUnsubscribe: (socket, path, params, next) => {
      console.log('onUnsubscribe');
      metric.off(params.id);
      next();
    }
  });
};