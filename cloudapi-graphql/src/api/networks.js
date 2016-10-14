const request = require('./request');

module.exports.list = () => {
  return request('listNetworks');
};

module.exports.get = (ctx) => {
  return request('getNetwork', ctx);
};
