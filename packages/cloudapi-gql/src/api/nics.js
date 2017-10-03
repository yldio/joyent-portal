const request = require('./request');

module.exports.list = () => request('listNics');
module.exports.get = ctx => request('getNic', ctx);
module.exports.add = ctx => request('');
module.exports.destroy = ctx => request('');
