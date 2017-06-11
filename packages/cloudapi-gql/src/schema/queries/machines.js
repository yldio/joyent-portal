const MachineType = require('../types/machine');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLInt, GraphQLList, GraphQLString, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(MachineType),
  args: {
    id: {
      type: GraphQLID
    },
    brand: {
      type: GraphQLString,
      description: 'Filter on the type of instance (e.g. lx)'
    },
    name: {
      type: GraphQLString,
      description:
        'Machine name to find (will make your list size 1, or 0 if nothing found)'
    },
    image: {
      type: GraphQLString,
      description: 'Image id; returns instances provisioned with that image'
    },
    state: {
      type: GraphQLString,
      description: 'Filter on the current state (e.g. running)'
    },
    memory: {
      type: GraphQLInt,
      description: 'Filter on the current size of the RAM deployed (in MiB)'
    },
    tombstone: {
      type: GraphQLInt,
      description: 'Filter on instances destroyed in the last N minutes'
    },
    first: {
      type: GraphQLInt,
      description:
        'Return a max of N instances; default is 1000 (which is also the maximum allowable result set size)'
    },
    after: {
      type: GraphQLInt,
      description: 'Get a `first` number of instances starting at this offset'
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'Filter on existing tags'
    },
    docker: {
      type: GraphQLString,
      description:
        'Whether to only list Docker instances, or only non-Docker instances, if present. Defaults to showing all instances.'
    },
    credentials: {
      type: GraphQLString,
      description:
        'Whether to include the generated credentials for instances, if present. Defaults to false'
    }
  },
  resolve(root, args) {
    const { list, get } = api.machines;

    const { after, first } = args;

    const newArgs = Object.assign(args, {
      limit: first,
      offset: after
    });

    return args.id
      ? get({
          id: args.id
        }).then(machine => [machine])
      : list(newArgs);
  }
};
