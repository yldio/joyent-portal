const request = require('./request');

module.exports.list = (ctx) => {
  return request('listPackages', ctx);
};

module.exports.get = (ctx) => {
  return request('getPackage', ctx);
};
