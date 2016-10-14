const MachineType = require('../types/machine');
const DynamicObjectType = require('../types/dynamic-object');
const api = require('../../api');

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList
} = require('graphql');

module.exports.createMachine = {
  type: MachineType,
  description: 'Allows you to provision an instance',
  args: {
    name: {
      type: GraphQLString,
      description: 'Friendly name for this instance; default is the first 8 characters of the machine id'
    },
    'package': {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the package to use on provisioning, obtained from ListPackages'
    },
    image: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The image UUID (from images { id })'
    },
    networks: {
      type: new GraphQLList(GraphQLString),
      description: 'Desired networks ids (from networks { id })'
    },
    locality: {
      type: MachineType.locality,
      description: 'Optionally specify which instances the new instance should be near or far from'
    },
    metadata: {
      type: DynamicObjectType,
      description: 'An arbitrary set of metadata key/value pairs can be set at provision time'
    },
    tags: {
      type: DynamicObjectType,
      description: 'An arbitrary set of tags can be set at provision time'
    },
    firewall_enabled: {
      type: GraphQLBoolean,
      description: 'Completely enable or disable firewall for this instance. Default is false'
    }
  },
  resolve: (root, args) => {
    const resolveNames = (obj = {}, namespace) => {
      return Object.keys(obj).reduce((all, name) => {
        return Object.assign(all, {
          [`${namespace}.${name}`]: obj[name]
        });
      }, {});
    };

    const tags = resolveNames(args.tags, 'tag');
    const metadata = resolveNames(args.tags, 'metadata');

    const machine = Object.assign({
      name: args.name,
      'package': args['package'],
      image: args.image,
      networks: args.networks,
      locality: args.locality,
      firewall_enabled: args.firewall_enabled
    }, tags, metadata);

    return api.machines.create(machine);
  }
};

module.exports.startMachine = {
  type: MachineType,
  description: 'Allows you to boot up an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    return api.machines.start(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.startMachineFromSnapshot = {
  type: MachineType,
  description: 'If an instance is in the "stopped" state, you can choose to start the instance from the referenced snapshot',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    name: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The snapshot id'
    }
  },
  resolve: (root, args) => {
    return api.machines.startFromSnapshot(args).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.stopMachine = {
  type: MachineType,
  description: 'Allows you to shut down an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    return api.machines.stop(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.rebootMachine = {
  type: MachineType,
  description: 'Allows you to reboot an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    return api.machines.reboot(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.deleteMachine = {
  type: DynamicObjectType,
  description: 'Allows you to completely destroy an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    return api.machines.destroy(args.id);
  }
};

module.exports.auditMachine = {
  type: new GraphQLList(DynamicObjectType),
  description: 'Provides a list of an instance\'s accomplished actions. Results are sorted from newest to oldest action',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    return api.machines.destroy(args.id);
  }
};

module.exports.setMachineFirewall = {
  type: MachineType,
  description: 'Allows you to set the firewall state for an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    enabled: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  resolve: (root, args) => {
    const {
      firewall
    } = api.machines;

    const fn = args.enabled ? firewall.enable : firewall.disable;

    return fn(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.enableMachineFirewall = {
  type: MachineType,
  description: 'Allows you to enable the firewall for an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    const {
      firewall
    } = api.machines;

    return firewall.enable(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.disableMachineFirewall = {
  type: MachineType,
  description: 'Allows you to completely disable the firewall of an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    }
  },
  resolve: (root, args) => {
    const {
      firewall
    } = api.machines;

    return firewall.disable(args.id).then((machine) => {
      if (machine) {
        return machine;
      }

      return api.machines.get(args);
    });
  }
};

module.exports.addMachineTags = {
  type: DynamicObjectType,
  description: 'Set tags on the given instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    tags: {
      type: new GraphQLNonNull(DynamicObjectType),
      description: 'Tag name/value pairs'
    }
  },
  resolve: (root, args) => {
    const {
      tags
    } = api.machines;

    return tags.add(args);
  }
};

module.exports.replaceMachineTags = {
  type: DynamicObjectType,
  description: 'Fully replace all tags on an instance with the given tags',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    tags: {
      type: new GraphQLNonNull(DynamicObjectType),
      description: 'Tag name/value pairs'
    }
  },
  resolve: (root, args) => {
    const {
      tags
    } = api.machines;

    return tags.replace(args);
  }
};

module.exports.deleteMachineTags = {
  type: DynamicObjectType,
  description: 'Deletes tags from an instance',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    tag: {
      type: GraphQLString,
      description: 'Tag name to remove. If value is not supplied, all machine tags are removed'
    }
  },
  resolve: (root, args) => {
    const {
      tags
    } = api.machines;

    return tags.destroy(args);
  }
};
