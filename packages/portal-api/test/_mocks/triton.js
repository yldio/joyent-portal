'use strict';

const Find = require('lodash.find');

module.exports = ({ machines = [], networks = [] }) => {
  const getMachine = (machineId, cb) => {
    cb(null, Find(machines, ['id', machineId]));
  };

  const getNetwork = (networkId, cb) => {
    cb(null, Find(networks, ['id', networkId]));
  };

  const createClient = (opts, cb) => {
    return cb(null, {
      cloudapi: {
        getMachine,
        getNetwork
      }
    });
  };

  return {
    createClient
  };
};
