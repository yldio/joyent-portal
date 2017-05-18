'use strict';

const Graphi = require('graphi');
const PortalData = require('portal-data');
const Graphql = require('./models/graphql');
const Pack = require('../package.json');
const Routes = require('./routes');


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
        options: Graphql.options(data)
      }
    ]);

    server.route(Routes);

    next();
  });
};

module.exports.attributes = {
  name: Pack.name,
  version: Pack.version,
  once: true,
  multiple: false
};
