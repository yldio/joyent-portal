'use strict';

const fs = require('fs');
const hapi = require('hapi');
const inert = require('inert');
const path = require('path');
const template = require('lodash.template');
const understood = require('understood');

const index = path.join(__dirname, './index.html');
const html = template(fs.readFileSync(index, 'utf-8'));

const server = new hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, '../static')
      }
    }
  }
});

server.connection({
  port: process.env.PORT || 8000
});

const plugins = [
  inert,
  {
    register: understood,
    options: {
      'default': 'en-us',
      localesDir: path.join(__dirname, '../static/locales')
    }
  }
];

const defaultHandler = (request, reply) => {
  const locales = (request.locale || '').toLowerCase().split(/\-/);

  reply(html({
    locale: locales[1],
    lang: locales[0]
  }));
};

server.register(plugins, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: false
      }
    }
  });

  server.route({
    method: '*',
    path: '/{param*}',
    handler: defaultHandler
  });

  server.start((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server running at: http://localhost:${server.info.port}`);
  });
});
