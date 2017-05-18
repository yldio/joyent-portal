const str = require('string-to-stream');

let messageId = 0;

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/stats',
    handler: (request, reply) => {
      request.raw.res.setHeader('Content-Type', 'text/event-stream');

      const intervalId = setInterval(() => {
        const resourcePath = `/resource/${messageId}`;

        if (!request.raw.res.push) {
          clearInterval(intervalId);
          return;
        }

        const stream = request.raw.res.push(resourcePath, {
          status: 200,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        str(JSON.stringify({
          msg: messageId
        })).pipe(stream);

        request.raw.res.write(`data:${resourcePath}\n\n`);

        messageId += 1;
      }, 100);
    }
  });
};
