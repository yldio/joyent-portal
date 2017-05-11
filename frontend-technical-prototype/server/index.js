'use strict';

const Fs = require('fs');
const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const PortalApi = require('portal-api');
const Template = require('lodash.template');
const Understood = require('understood');

const index = Path.join(__dirname, './index.html');
const html = Template(Fs.readFileSync(index, 'utf-8'));

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../static')
      }
    }
  }
});

server.connection({
  port: process.env.PORT || 8000
});

const plugins = [
  Inert,
  {
    register: Understood,
    options: {
      default: 'en-us',
      localesDir: Path.join(__dirname, '../static/locales')
    }
  },
  {
    register: PortalApi,
    routes: {
      prefix: '/api'
    }
  }
];

const defaultHandler = (request, reply) => {
  const locales = (request.locale || '').toLowerCase().split(/\-/);

  reply(html({
    locale: request.locale,
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
    path: '/static/images/{param*}',
    handler: {
      directory: {
        path: './images/',
        redirectToSlash: true,
        index: false
      }
    }
  });

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
