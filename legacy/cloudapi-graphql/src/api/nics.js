const request = require('./request');

module.exports.list = () => {
  return request('listNics');
};

module.exports.get = ctx => {
  return request('getNic', ctx);
};
