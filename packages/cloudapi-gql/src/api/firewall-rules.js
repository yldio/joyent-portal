const request = require('./request');

module.exports.list = () => {
  return request('listFirewallRules', {});
};

module.exports.listByMachine = ctx => {
  return request('listMachineFirewallRules', ctx);
};

module.exports.listMachines = ctx => {
  return request('listFirewallRuleMachines', ctx);
};

module.exports.get = ctx => {
  return request('getFirewallRule', ctx);
};

module.exports.create = ctx => {
  return request('createFirewallRule', ctx);
};

module.exports.update = ctx => {
  return request('updateFirewallRule', ctx);
};

module.exports.enable = ctx => {
  return request('enableFirewallRule', ctx);
};

module.exports.disable = ctx => {
  return request('disableFirewallRule', ctx);
};

module.exports.destroy = ctx => {
  return request('deleteFirewallRule', ctx);
};
