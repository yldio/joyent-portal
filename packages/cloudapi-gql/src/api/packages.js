const request = require('./request');

module.exports.list = ctx => request('listPackages', ctx);
module.exports.get = ctx => request('getPackage', ctx);
