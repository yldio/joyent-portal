const path = require('path');

module.exports = (server) => {
  server.route({
    method: ['GET', 'POST'],
    path: '/auth/twitter',
    config: {
      auth: 'twitter',
      handler: (request, reply) => {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }

        reply(`Welcome ${request.auth.credentials.profile.displayName}`);
      }
    }
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/auth/github',
    config: {
      auth: 'github',
      handler: (request, reply) => {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }

        console.log(request.auth);

        reply(`Welcome ${request.auth.credentials.profile.displayName}`);
      }
    }
  });
};
