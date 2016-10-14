const PolicyType = require('../types/policy');
const api = require('../../api');

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

module.exports.createPolicy = {
  type: PolicyType,
  description: 'Creates a new account policy',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The policy name'
    },
    rules: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'One or more Aperture sentences to be added to the current policy'
    },
    description: {
      type: GraphQLString,
      description: 'A description for this policy (Optional)'
    }
  },
  resolve: (root, args) => {
    return api.policies.create(args);
  }
};

module.exports.updatePolicy = {
  type: PolicyType,
  description: 'Upgrades an existing account policy. Everything but id can be modified',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The policy name'
    },
    rules: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'One or more Aperture sentences to be added to the current policy'
    },
    description: {
      type: GraphQLString,
      description: 'A description for this policy (Optional)'
    }
  },
  resolve: (root, args) => {
    return api.policies.update(args);
  }
};

module.exports.deletePolicy = {
  type: GraphQLID,
  description: 'Delete an RBAC policy',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => {
    return api.policies.destroy(args).then(() => {
      return args.id;
    });
  }
};
