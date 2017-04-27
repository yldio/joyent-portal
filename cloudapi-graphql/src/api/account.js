const request = require('./request');

module.exports.get = () => {
  return request('getAccount');
};

module.exports.update = ctx => {
  return request('updateAccount', ctx);
};
