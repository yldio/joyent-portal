'use strict';

const Schema = require('joyent-cp-gql-schema');
const Graphi = require('graphi');
const Piloted = require('piloted');
const Data = require('./data');
const Pack = require('../package.json');
const Resolvers = require('./resolvers');
const ContainerPilotWatcher = require('./watch/container-pilot');
const MachinesWatcher = require('./watch/machines');

const {
  NAMESPACE
} = process.env;

const namespace = NAMESPACE ?
  `/${NAMESPACE}` :
  '';

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

  options.watch.server = server;
  options.data.server = server;
  const data = new Data(options.data);
  const cpWatcher = new ContainerPilotWatcher(Object.assign(options.watch, { data }));
  const machinesWatcher = new MachinesWatcher(Object.assign(options.watch, {
    data
  }));

  // watcher <-> watcher
  // portal depends on watcher and vice-versa
  // I'm sure there is a better way to organize this domains
  // but this works for now
  data.setMachinesWatcher(machinesWatcher);

  cpWatcher.on('error', (err) => {
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

    machinesWatcher.poll();
    cpWatcher.poll();

    server.register([
      {
        register: Graphi,
        options: {
          graphqlPath: `${namespace}/graphql`,
          graphiqlPath: `${namespace}/graphiql`,
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
