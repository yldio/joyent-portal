const awaitify = require('apr-awaitify');
const fetch = require('node-fetch');
const url = require('url');

const request = require('./request');

const { _path, _getAuthHeaders, account, url: host } = request.client;
const client = request.client;
const getAuthHeaders = awaitify(_getAuthHeaders.bind(client));

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
  list: async ({ id }) => {
    const pathname = _path.call(client, `/${account}/machines/${id}/metadata`);
    const headers = await getAuthHeaders('GET', pathname);

    const href = url.format({
      protocol: 'https',
      host: host.replace(/^https:\/\//, ''),
      pathname
    });

    return fetch(href, { method: 'GET', headers }).then(response =>
      response.json()
    );
  },
  get: ctx => {
    return request('getMachineMetadata', ctx);
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
