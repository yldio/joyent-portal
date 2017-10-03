const request = require('./request');

const snapshots = {
  list: ctx => request('listMachineSnapshots', ctx),
  get: ctx => request('getMachineSnapshot', ctx),
  create: ctx => request('createMachineSnapshot', ctx),
  destroy: ctx => request('deleteMachineSnapshot', ctx)
};

const metadata = {
  list: ({ id }) => request.fetch(`/:login/machines/${id}/metadata`),
  get: ({ id, key }) => request.fetch(`/:login/machines/${id}/metadata/${key}`),
  destroy: ctx => request('', ctx)
};

const firewall = {
  enable: ctx => request('enableMachineFirewall', ctx),
  disable: ctx => request('disableMachineFirewall', ctx)
};

const tags = {
  list: ctx => request('listMachineTags', ctx),
  get: ctx => request('getMachineTag', ctx),
  add: ctx => request('addMachineTags', ctx),
  replace: ctx => request('replaceMachineTags', ctx),
  destroy: ctx =>
    request(ctx.tag ? 'deleteMachineTag' : 'deleteMachineTags', ctx)
};

module.exports.list = ctx => request('listMachines', ctx);
module.exports.get = ctx => request('getMachine', ctx);
module.exports.create = ctx => request('createMachine', ctx);
module.exports.stop = ctx => request('stopMachine', ctx);
module.exports.start = uuid => request('startMachine', uuid);
module.exports.startFromSnapshot = ctx =>
  request('startMachineFromSnapshot', ctx);
module.exports.reboot = ctx => request('rebootMachine', ctx);
module.exports.resize = ctx => request('', ctx);
module.exports.rename = ctx => request('', ctx);
module.exports.destroy = ctx => request('deleteMachine', ctx);
module.exports.audit = ({ id }) => request('machineAudit', id);

module.exports.snapshots = snapshots;
module.exports.metadata = metadata;
module.exports.firewall = firewall;
module.exports.tags = tags;
