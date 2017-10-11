const { toKeyValue, fromKeyValue } = require('../api/key-value');
const api = require('../api');

const resolvers = {
  Query: {
    account: () => api.account.get(),

    keys: (root, { login, name }) =>
      name
        ? api.keys.get({ login, name }).then(key => [key])
        : api.keys.list({ login, name }),

    key: (root, { login, name }) => api.keys.get({ login, name }),

    users: (root, { id }) =>
      id ? api.users.get({ id }).then(user => [user]) : api.users.list(),

    user: (root, { id }) => api.users.get({ id }),

    roles: (root, { id, name }) =>
      id || name
        ? api.roles.get({ id, name }).then(role => [role])
        : api.roles.list(),

    role: (root, { id, name }) => api.roles.get({ id, name }),

    policies: (root, { id }) =>
      id
        ? api.policies.get({ id }).then(policy => [policy])
        : api.policies.list(),

    policy: (root, { id }) => api.policies.get({ id }),

    config: () => api.config().then(toKeyValue),

    datacenters: () =>
      api.datacenters().then(dcs =>
        Object.keys(dcs).map(name => ({
          name,
          url: dcs[name]
        }))
      ),

    services: () => api.services().then(toKeyValue),

    images: (root, { id, ...rest }) =>
      id
        ? api.images.get({ id }).then(image => [image])
        : api.images.list(rest),

    image: (root, { id }) => api.images.get({ id }),

    packages: (root, { id, ...rest }) =>
      id
        ? api.packages.get({ id }).then(pkg => [pkg])
        : api.packages.list(rest),

    package: (root, { id, name }) => api.packages.get({ id, name }),

    machines: (root, { id, brand, state, tags, ...rest }) =>
      id
        ? api.machines.get({ id }).then(machine => [machine])
        : api.machines.list(
            Object.assign(rest, {
              brand: brand ? brand.toLowerCase() : brand,
              state: state ? state.toLowerCase() : state,
              tags: fromKeyValue(tags)
            })
          ),

    machine: (root, { id }) => api.machines.get({ id }),

    snapshots: (root, { name, machine }) =>
      name
        ? api.machines.snapshots
            .get({ id: machine, name })
            .then(snapshot => [snapshot])
        : api.machines.snapshots.list({ id: machine }),

    snapshot: (root, { name, machine }) =>
      api.machines.snapshots.get({ name, id: machine }),

    metadata: (root, { machine, name, ...rest }) =>
      name
        ? api.machines.metadata
            .get(Object.assign(rest, { id: machine, key: name }))
            .then(value => toKeyValue({ [name]: value }))
        : api.machines.metadata.list({ id: machine }).then(toKeyValue),

    metadataValue: (root, { name, machine }) =>
      api.machines.metadata
        .get({ key: name, id: machine })
        .then(value => toKeyValue({ [name]: value }).shift()),

    tags: (root, { machine, name }) =>
      name
        ? api.machines.tags
            .get({ id: machine, tag: name })
            .then(value => toKeyValue({ [name]: value }))
        : api.machines.tags.list({ id: machine }).then(toKeyValue),

    tag: (root, { machine, name }) =>
      api.machines.tags
        .get({ id: machine, tag: name })
        .then(value => toKeyValue({ [name]: value }).shift()),

    actions: (root, { machine }) => api.machines.audit({ id: machine }),

    // eslint-disable-next-line camelcase
    firewall_rules: (root, { machine, id }) =>
      id
        ? api.firewall.get({ id })
        : machine
          ? api.firewall.listByMachine({ id: machine })
          : api.firewall.list(),

    // eslint-disable-next-line camelcase
    firewall_rule: (root, { id }) => api.firewall.get({ id }),

    vlans: (root, { id }) => (id ? api.vlans.get({ id }) : api.vlans.list()),

    vlan: (root, { id }) => api.vlans.get({ id }),

    networks: (root, { id, vlan }) =>
      id ? api.networks.get({ id, vlan }) : api.networks.list({ vlan }),

    network: (root, { id, vlan }) => api.networks.get({ id, vlan }),

    nics: (root, { machine, mac }) =>
      mac ? api.nics.get({ machine, mac }) : api.nics.list({ machine }),

    nic: (root, { machine, mac }) => api.nics.get({ machine, mac })
  },
  User: {
    keys: ({ login }, { name }) => resolvers.Query.keys(null, { login, name })
  },
  Machine: {
    brand: ({ brand }) => (brand ? brand.toUpperCase() : brand),

    state: ({ state }) => (state ? state.toUpperCase() : state),

    image: ({ image }) => resolvers.Query.image(null, { id: image }),

    // eslint-disable-next-line camelcase
    primary_ip: ({ primaryIp }) => primaryIp,

    tags: ({ id }, { name }) =>
      resolvers.Query.tags(null, { machine: id, name }),

    metadata: ({ id }, { name }) =>
      resolvers.Query.metadata(null, { machine: id, name }),

    networks: ({ networks }) =>
      Promise.all(networks.map(id => resolvers.Query.network(null, { id }))),

    // eslint-disable-next-line camelcase
    package: root => resolvers.Query.package(null, { name: root.package }),

    snapshots: ({ id }, { name }) =>
      resolvers.Query.snapshots(null, { machine: id, name }),

    // eslint-disable-next-line camelcase
    firewall_rules: ({ id: machine }, { id }) =>
      resolvers.Query.firewall_rules(null, { machine, id }),

    actions: ({ id }) => resolvers.Query.actions(null, { machine: id })
  },
  Image: {
    os: ({ os }) => (os ? os.toUpperCase() : os),

    state: ({ state }) => (state ? state.toUpperCase() : state),

    type: ({ type }) => (type ? type.toUpperCase() : type)
  },
  Action: {
    name: ({ action }) => action,

    parameters: ({ parameters }) => toKeyValue(parameters)
  },
  Caller: {
    type: ({ type }) => (type ? type.toUpperCase() : type),

    // eslint-disable-next-line camelcase
    key_id: ({ keyId }) => keyId
  },
  FirewallRule: {
    machines: ({ id }) => api.firewall.listMachines({ id })
  },
  Snapshot: {
    state: ({ state }) => (state ? state.toUpperCase() : state)
  },
  ImageError: {
    code: ({ code }) => (code ? code.toUpperCase() : code)
  },
  ImageFile: {
    compression: ({ compression }) =>
      compression ? compression.toUpperCase() : compression
  },
  Mutation: {
    stopMachine: (root, { id }) =>
      api.machines.stop(id).then(() => resolvers.Query.machine(null, { id })),

    startMachine: (root, { id }) =>
      api.machines.start(id).then(() => resolvers.Query.machine(null, { id })),

    rebootMachine: (root, { id }) =>
      api.machines.reboot(id).then(() => resolvers.Query.machine(null, { id })),

    resizeMachine: (root, { id, ...args }) =>
      api.machines
        .resize({ id, package: args.package })
        .then(() => resolvers.Query.machine(null, { id })),

    enableMachineFirewall: (root, { id }) =>
      api.machines.firewall
        .enable(id)
        .then(() => resolvers.Query.machine(null, { id })),

    disableMachineFirewall: (root, { id }) =>
      api.machines.firewall
        .disable(id)
        .then(() => resolvers.Query.machine(null, { id })),

    createMachineSnapshot: (root, { id, name }) =>
      api.machines.snapshots
        .create({ id, name })
        .then(() => resolvers.Query.snapshots(null, { machine: id, name })),

    startMachineFromSnapshot: (root, { id, name }) =>
      api.machines.snapshots
        .startFromSnapshot({ id, name })
        .then(() => resolvers.Query.machine(null, { id }))
  }
};

module.exports = resolvers;
