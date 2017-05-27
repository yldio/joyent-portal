'use strict';

const Schema = require('joyent-cp-gql-schema');
const Graphi = require('graphi');
const PortalData = require('portal-data');
const Pack = require('../package.json');
const Resolvers = require('./resolvers');


module.exports = function (server, options, next) {
  const data = new PortalData(options.data);
  data.connect((err) => {
    if (err) {
      return next(err);
    }

    server.bind(data);

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
