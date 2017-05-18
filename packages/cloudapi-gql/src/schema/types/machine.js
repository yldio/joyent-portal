const DynamicObjectType = require('./dynamic-object');
const SnapshotType = require('./snapshot');
const api = require('../../api');

const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'MachineType',
  description: 'An image contains the software packages that will be available on newly-provisioned instance. In the case of hardware virtual machines, the image also includes the operating system',
  // Function to allow circular dependencies
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Unique id for this instance'
    },
    name: {
      type: GraphQLString,
      description: 'The "friendly" name for this instance'
    },
    brand: {
      type: GraphQLString,
      description: 'The type of instance (e.g. lx)'
    },
    state: {
      type: GraphQLString,
      description: 'The current state of this instance (e.g. running)'
    },
    image: {
      type: GraphQLString,
      description: 'The image id this instance was provisioned with'
    },
    memory: {
      type: GraphQLInt,
      description: 'The amount of RAM this instance has (in MiB)'
    },
    disk: {
      type: GraphQLInt,
      description: 'The amount of disk this instance has (in MiB)'
    },
    metadata: {
      type: DynamicObjectType,
      description: 'Any additional metadata this instance has'
    },
    tags: {
      type: DynamicObjectType,
      description: 'Any tags this instance has',
      args: {
        name: {
          type: GraphQLString,
          description: 'Filter on the name of the tag'
        }
      },
      resolve: (root, args) => {
        const { tags: { get } } = api.machines;

        return args.name
          ? get({
              id: root.id,
              tag: args.name
            }).then(value => ({
              [args.name]: value
            }))
          : root.tags;
      }
    },
    created: {
      type: GraphQLString,
      description: 'When this instance was created'
    },
    updated: {
      type: GraphQLString,
      description: "When this instance's details was last updated"
    },
    docker: {
      type: GraphQLBoolean,
      description: 'Whether this instance is a Docker container, if present',
      resolve: root => {
        return Boolean(root.docker);
      }
    },
    ips: {
      type: new GraphQLList(GraphQLString),
      description: 'The IP addresses this instance has'
    },
    networks: {
      type: new GraphQLList(GraphQLString),
      description: 'The network UUIDs of the nics this instance has'
    },
    primaryIp: {
      type: GraphQLString,
      description: 'IP address of the primary nic of this instance'
    },
    firewallEnabled: {
      type: GraphQLBoolean,
      description: 'Whether firewall rules are enforced on this instance',
      resolve: root => {
        return Boolean(root.firewallEnabled);
      }
    },
    firewallRules: {
      // Circular dependency
      type: new GraphQLList(require('./firewall-rule')),
      description: 'List of FirewallRules affecting this machine',
      resolve: root => {
        return api.firewallRules.listByMachine(root.id);
      }
    },
    computeNode: {
      type: GraphQLString,
      description: 'UUID of the server on which the instance is located'
    },
    package: {
      type: GraphQLString,
      description: 'The id or name of the package used to create this instance'
    },
    snapshots: {
      type: new GraphQLList(SnapshotType),
      description: 'The snapshots based on this instance',
      args: {
        name: {
          type: GraphQLString,
          description: 'Filter on the name of the snapshot'
        }
      },
      resolve: (root, args) => {
        const { snapshot: { list, get } } = api.machines;

        return args.id
          ? list(root)
          : get({
              id: root.id,
              name: args.name
            });
      }
    }
  })
});

module.exports.locality = new GraphQLInputObjectType({
  name: 'LocalityType',
  fields: {
    strict: {
      type: GraphQLBoolean
    },
    near: {
      type: new GraphQLList(GraphQLID)
    },
    far: {
      type: new GraphQLList(GraphQLID)
    }
  }
});
