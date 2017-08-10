'use strict';

const Brule = require('brule');
const Good = require('good');
const Hapi = require('hapi');
const Toppsy = require('toppsy');
const Pack = require('./package');
const Portal = require('./lib');

const server = new Hapi.Server();

server.connection({
  port: 3000,
  routes: {
    cors: Boolean(process.env.CORS)
  }
});

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    consoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*', error: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

server.register([
  Brule,
  Portal,
  {
    register: Good,
    options: goodOptions
  },
  {
    register: Toppsy,
    options: { namespace: 'portal', subsystem: 'api' }
  }
],
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
