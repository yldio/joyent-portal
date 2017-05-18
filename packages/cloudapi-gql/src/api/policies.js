const request = require('./request');

module.exports.list = () => {
  return request('listPolicies');
};

module.exports.get = ctx => {
  return request('getPolicy', ctx);
};

module.exports.create = ctx => {
  return request('createPolicy', ctx);
};

module.exports.update = ctx => {
  return request('updatePolicy', ctx);
};

module.exports.destroy = ctx => {
  return request('deletePolicy', ctx);
};
