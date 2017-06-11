const KeyType = require('../types/key');
const api = require('../../api');

const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');

module.exports.createKey = {
  type: KeyType,
  description:
    'Uploads a new OpenSSH key to Triton for use in HTTP signing and SSH',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    key: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: GraphQLID,
      description:
        'UserId to add this key to. Leaving this in blank will add the key to the account'
    }
  },
  resolve: (root, args) => {
    const _api = args.userId ? api.keys.user : api.keys.account;
    return _api.create(args);
  }
};

module.exports.deleteKey = {
  type: GraphQLID,
  description: 'Deletes a single SSH key, by name or fingerprint',
  args: {
    name: {
      type: GraphQLString
    },
    fingerprint: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLID,
      description:
        'UserId who this key belongs to. Leaving this in blank will delete an account key'
    }
  },
  resolve: (root, args) => {
    const _api = args.userId ? api.keys.user : api.keys.account;

    return _api.destroy(args).then(() => {
      return args.name || args.fingerprint;
    });
  }
};
