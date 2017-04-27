const request = require('./request');

const snapshots = {
  list: ctx => {
    return request('listMachineSnapshots', ctx);
  },
  get: ctx => {
    return request('getMachineSnapshot', ctx);
  },
  create: ctx => {
    return request('createMachineSnapshot', ctx);
  },
  destroy: ctx => {
    return request('deleteMachineSnapshot', ctx);
  }
};

const metadata = {
  list: ctx => {
    return request('', ctx);
  },
  get: ctx => {
    return request('', ctx);
  },
  update: ctx => {
    return request('', ctx);
  },
  destroy: ctx => {
    return request('', ctx);
  }
};

const firewall = {
  enable: ctx => {
    return request('enableMachineFirewall', ctx);
  },
  disable: ctx => {
    return request('disableMachineFirewall', ctx);
  }
};

const tags = {
  list: ctx => {
    return request('listMachineTags', ctx);
  },
  get: ctx => {
    return request('getMachineTag', ctx);
  },
  add: ctx => {
    return request('addMachineTags', ctx);
  },
  replace: ctx => {
    return request('replaceMachineTags', ctx);
  },
  destroy: ctx => {
    const method = ctx.tag ? 'deleteMachineTag' : 'deleteMachineTags';
    return request(method, ctx);
  }
};

module.exports.list = ctx => {
  return request('listMachines', ctx);
};

module.exports.get = ctx => {
  return request('getMachine', ctx);
};

module.exports.create = ctx => {
  return request('createMachine', ctx);
};

module.exports.stop = ctx => {
  return request('stopMachine', ctx);
};

module.exports.start = uuid => {
  return request('startMachine', uuid);
};

module.exports.startFromSnapshot = ctx => {
  return request('startMachineFromSnapshot', ctx);
};

module.exports.reboot = ctx => {
  return request('rebootMachine', ctx);
};

module.exports.resize = ctx => {
  return request('', ctx);
};

module.exports.rename = ctx => {
  return request('', ctx);
};

module.exports.destroy = ctx => {
  return request('deleteMachine', ctx);
};

module.exports.audit = ctx => {
  return request('machineAudit', ctx);
};

module.exports.snapshots = snapshots;
module.exports.metadata = metadata;
module.exports.firewall = firewall;
module.exports.tags = tags;
