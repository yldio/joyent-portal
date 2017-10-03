const request = require('./request');

module.exports.list = () => request('listFirewallRules', {});
module.exports.listByMachine = ctx => request('listMachineFirewallRules', ctx);
module.exports.listMachines = ctx => request('listFirewallRuleMachines', ctx);
module.exports.get = ({ id }) => request('getFirewallRule', id);
module.exports.create = ctx => request('createFirewallRule', ctx);
module.exports.update = ctx => request('updateFirewallRule', ctx);
module.exports.enable = ctx => request('enableFirewallRule', ctx);
module.exports.disable = ctx => request('disableFirewallRule', ctx);
module.exports.destroy = ctx => request('deleteFirewallRule', ctx);
