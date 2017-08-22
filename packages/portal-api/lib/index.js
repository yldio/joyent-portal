'use strict';

const Schema = require('joyent-cp-gql-schema');
const Graphi = require('graphi');
const Hoek = require('hoek');
const Piloted = require('piloted');
const Data = require('./data');
const Pack = require('../package.json');
const Resolvers = require('./resolvers');
const ContainerPilotWatcher = require('./watch/container-pilot');
const MachinesWatcher = require('./watch/machines');


const internals = {
  namespace: process.env.NAMESPACE ? `/${process.env.NAMESPACE}` : '',
  defaults: {
    data: {
      db: {
        host: 'localhost'
      },
      dockerComposeHost: 'tcp://0.0.0.0:4242'
    },
    watch: {
      url: process.env.SDC_URL,
      account: process.env.SDC_ACCOUNT,
      keyId: process.env.SDC_KEY_ID
    }
  }
};

module.exports = function (server, options, next) {
  const settings = Hoek.applyToDefaults(internals.defaults, options || {});

  try {
    const docker = Piloted.service('docker-compose-api');
    if (docker) {
      settings.data.dockerComposeHost = `tcp://${docker.address}:${docker.port}`;
    }

    const rethinkdb = Piloted.service('rethinkdb');
    if (rethinkdb) {
      settings.data.db.host = rethinkdb.address;
    }
  } catch (ex) {
    server.log(['error'], ex);
  }

  settings.watch.server = server;
  settings.data.server = server;

  const data = new Data(settings.data);
  const cpWatcher = new ContainerPilotWatcher(Object.assign(settings.watch, { data }));
  const machinesWatcher = new MachinesWatcher(Object.assign(settings.watch, { data }));

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
          graphqlPath: `${internals.namespace}/graphql`,
          graphiqlPath: `${internals.namespace}/graphiql`,
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
    if (docker) {
      data.reconnectCompose(`tcp://${docker.address}:${docker.port}`);
    }

    const rethinkdb = Piloted.service('rethinkdb');
    if (rethinkdb) {
      data.reconnectDb({ host: rethinkdb.address });
    }
  };
};
