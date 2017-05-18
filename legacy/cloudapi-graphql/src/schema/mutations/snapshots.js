const SnapshotType = require('../types/snapshot');
const api = require('../../api');

const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');

module.exports.createSnapshot = {
  type: SnapshotType,
  description: 'Allows you to take a snapshot of a machine instance',
  args: {
    machine: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    name: {
      type: GraphQLString,
      description: 'The name to assign to the new snapshot'
    }
  },
  resolve: (root, args) => {
    const { snapshot: { create, get } } = api.machines;

    const newArgs = {
      id: args.machine,
      name: args.name
    };

    return create(newArgs).then(snapshot => {
      if (snapshot) {
        return snapshot;
      }

      return get(newArgs);
    });
  }
};

module.exports.deleteSnapshot = {
  type: GraphQLID,
  description: 'Deletes the specified snapshot of an instance',
  args: {
    machine: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The machine id'
    },
    name: {
      type: GraphQLString,
      description: 'The name to assign to the new snapshot'
    }
  },
  resolve: (root, args) => {
    const { snapshot: { destroy } } = api.machines;

    const newArgs = {
      id: args.machine,
      name: args.name
    };

    return destroy(newArgs).then(() => args.name);
  }
};
