let messageId = 0;

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/stats',
    handler: (request, reply) => {
      request.raw.res.setHeader('Content-Type', 'text/event-stream');

      const intervalId = setInterval(() => {
        messageId += 1;

        const str = JSON.stringify({
          msg: messageId
        });

        request.raw.res.write(`data:${str}\n\n`);
      }, 100);
    }
  });
};
