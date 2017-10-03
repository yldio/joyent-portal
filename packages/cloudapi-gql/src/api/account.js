const request = require('./request');

module.exports.get = () => request('getAccount');
module.exports.update = ctx => request('updateAccount', ctx);
