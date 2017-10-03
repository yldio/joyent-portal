const request = require('./request');

module.exports.list = () => request('listUsers');
module.exports.get = ctx => request('getUser', ctx);
module.exports.create = ctx => request('createUser', ctx);
module.exports.destroy = ctx => request('deleteUser', ctx);
module.exports.update = ctx => request('updateUser', ctx);
