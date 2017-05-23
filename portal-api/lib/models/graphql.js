'use strict';

const Fs = require('fs');
const Path = require('path');


const internals = {
  schema: Fs.readFileSync(Path.join(__dirname, 'schema.gql')).toString()
};


exports.options = (data) => {
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
    schema: internals.schema,
    functions: {
      portal: getPortal,
      deploymentGroups: getDeploymentGroups,
      deploymentGroup: getDeploymentGroup,
      serviceScales: getServiceScales,
      serviceScale: getServiceScale
    }
  };
};
