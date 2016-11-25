const epimetheus = require('epimetheus');
const requireDir = require('require-dir');
const plugins = require('./plugins');
const routes = requireDir('./routes');
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 8000
});

epimetheus.instrument(server);

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  Object.keys(routes).forEach((name) => {
    routes[name](server);
  });

  server.start((err) => {
    server.connections.forEach((conn) => {
      console.log(`started at: ${conn.info.uri}`);
    });
  });
});
