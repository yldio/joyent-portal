'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Portal = require('./lib');

const server = new Hapi.Server();
server.connection({
  port: 3000,
  routes: {
    cors: true
  }
});

const options = {
  info: {
    'title': 'Portal API Documentation',
    'version': Pack.version
  }
};

server.register([
  Inert,
  Vision,
  Portal,
  {
    register: HapiSwagger,
    options
  }],
  (err) => {
    handlerError(err);
    server.start((err) => {
      handlerError(err);
      console.log(`server started at http://localhost:${server.info.port}`);
    });
  }
);

function handlerError (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
}
