'use strict';

const Schema = require('joyent-cp-gql-schema');
const Graphi = require('graphi');
const Piloted = require('piloted');
const Data = require('./data');
const Pack = require('../package.json');
const Resolvers = require('./resolvers');
const Watch = require('./watch');
const WatchHealth = require('./watch/health');


const internals = {};


module.exports = function (server, options, next) {
  try {
    const docker = Piloted.service('docker-compose-api');
    if (docker) {
      options.data.dockerComposeHost = `tcp://${docker.address}:${docker.port}`;
    }
  } catch (ex) {
    console.error(ex);
  }

  const data = new Data(options.data);
  const watcher = new Watch(Object.assign(options.watch, {
    data
  }));

  // watcher <-> watcher
  // portal depends on watcher and vice-versa
  // I'm sure there is a better way to organize this domains
  // but this works for now
  data.setWatcher(watcher);

  const healthWatcher = new WatchHealth(Object.assign(options.health, { data }));
  healthWatcher.on('error', (err) => {
    server.log(['error'], err);
  });

  data.on('error', (err) => {
    server.log(['error'], err);
  });

  data.connect((err) => {
    if (err) {
      return next(err);
    }

    server.bind(data);

    Piloted.on('refresh', internals.refresh(data));
    watcher.poll();
    healthWatcher.poll();

    server.register([
      {
        register: Graphi,
        options: {
          schema: Schema,
          resolvers: Resolvers(data)
        }
      }
    ]);

    next();
  });
};

module.exports.attributes = {
  name: Pack.name,
  version: Pack.version,
  once: true,
  multiple: false
};


internals.refresh = function (data) {
  return () => {
    const docker = Piloted.service('docker-compose-api');
    if (!docker) {
      return;
    }

    data.reconnectCompose(`tcp://${docker.address}:${docker.port}`);
  };
};
