const compile = require('./compile');
const detach = require('./detach');

module.exports = ({
  source,
  entrypoint,
  config
}, fn) => {
  return !config.fullpath ? compile({
    source,
    entrypoint,
    config: config.instantiated
  }, fn) : detach({
    source,
    entrypoint,
    configFullpath: config.fullpath
  }, fn);
};
