const request = require('./request');

module.exports.list = ctx => request('listPackages', ctx);
module.exports.get = ({ id, name }) =>
  request.fetch(`/:login/packages/${id || name}`);
