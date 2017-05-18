'use strict';

const Fs = require('fs');
const Path = require('path');


const internals = {
  schema: Fs.readFileSync(Path.join(__dirname, 'schema.gql')).toString()
};


exports.options = (data) => {
  const queryWrap = function (name) {
    return function (args, request) {
      return data[name](args);
    };
  };

  const queries = [
    'portal',
    'deploymentGroups',
    'deploymentGroup',
    'services',
    'service',
    'instances',
    'instance',
    'metricTypes',
    'metricData',
    'package',
    'datacenters',
    'instanceMetric'
  ];

  const resolvers = {
    createDeploymentGroup: (args, request) => {
      return data.createDeploymentGroup(args.name);
    },

    updateDeploymentGroup: (args, request) => {
      return data.updateDeploymentGroup(args.uuid, args.name);
    },

    provisionManifest: (args, request) => {
      return data.provisionManifest(args.deploymentGroupUuid, args.type, args.format, args.raw);
    },

    scale: (args, request) => {
      return data.scale(args.service, args.replicas);
    },

    stopServices: (args, request) => {
      return data.stopServices(args.uuids);
    },

    startServices: (args, request) => {
      return data.startServices(args.uuids);
    },

    restartServices: (args, request) => {
      return data.restartServices(args.uuids);
    },

    deleteServices: (args, request) => {
      return data.deleteServices(args.uuids);
    },

    stopInstances: (args, request) => {
      return data.stopInstances(args.uuids);
    },

    startInstances: (args, request) => {
      return data.startInstances(args.uuids);
    },

    restartInstances: (args, request) => {
      return data.restartInstances(args.uuids);
    }
  };

  queries.forEach((query) => {
    const functionName = 'get' + query[0].toUpperCase() + query.slice(1);
    resolvers[query] = queryWrap(functionName);
  });

  return {
    schema: internals.schema,
    resolvers
  };
};
