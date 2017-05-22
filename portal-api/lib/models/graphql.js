'use strict';

const Fs = require('fs');
const Path = require('path');
const Graphql = require('graphql');


const internals = {
  schema: Fs.readFileSync(Path.join(__dirname, 'schema.gql')).toString()
};


exports.options = (data) => {
  const schema = Graphql.buildSchema(internals.schema);

  const getPortal = function (args, request) {

  };

  const getDeploymentGroups = function (args, request) {

  };

  const getDeploymentGroup = function (args, request) {

  };

  const getServiceScales = function (args, request) {

  };

  const getServiceScale = function (args, request) {

  };

  return {
    schema,
    endpointURL: '/graphql',
    rootValue: {
      portal: getPortal,
      deploymentGroups: getDeploymentGroups,
      deploymentGroup: getDeploymentGroup,
      serviceScales: getServiceScales,
      serviceScale: getServiceScale
    }
  };
};
