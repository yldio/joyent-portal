const http2 = require('http2');
const requireDir = require('require-dir');
const plugins = require('./plugins');
const routes = requireDir('./routes');
const Hapi = require('hapi');
const path = require('path');
const fs = require('fs');

const server = new Hapi.Server();

server.connection({
  listener: http2.createServer({
    key: fs.readFileSync(path.join(__dirname, '../key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert.pem')),
    log: require('bunyan').createLogger({
      name: 'server',
      stream: process.stdout,
      serializers: require('http2/lib/http').serializers
    })
  }),
  host: 'localhost',
  port: 8000,
  tls: true
});

Object.keys(routes).forEach((name) => {
  routes[name](server);
});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  server.start((err) => {
    server.connections.forEach((conn) => {
      console.log(`started at: ${conn.info.uri}`);
    });
  });
});
