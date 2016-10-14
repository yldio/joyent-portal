const request = require('./request');

module.exports.list = () => {
  return request('listUsers');
};

module.exports.get = (ctx) => {
  return request('getUser', ctx);
};

module.exports.create = (ctx) => {
  return request('createUser', ctx);
};

module.exports.destroy = (ctx) => {
  return request('deleteUser', ctx);
};

module.exports.update = (ctx) => {
  return request('updateUser', ctx);
};
