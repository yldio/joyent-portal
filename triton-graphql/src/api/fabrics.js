const request = require('./request');

module.exports.list = () => {
  return request('listFirewallRules', {});
};

module.exports.get = (ctx) => {
  return request('getFirewallRule', ctx);
};
