const KeyType = require('./key');
const api = require('../../api');

const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'LoginType',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this user/account'
    },
    login: {
      type: GraphQLString,
      description: 'Account/Sub-user login name'
    },
    email: {
      type: GraphQLString,
      description: 'Email address'
    },
    company_name: {
      type: GraphQLString,
      resolve: root => {
        return !!root.company_name || root.companyName;
      }
    },
    first_name: {
      type: GraphQLString,
      resolve: root => {
        return !!root.first_name || root.firstName;
      }
    },
    last_name: {
      type: GraphQLString,
      resolve: root => {
        return !!root.last_name || root.lastName;
      }
    },
    address: {
      type: GraphQLString
    },
    postal_code: {
      type: GraphQLString,
      resolve: root => {
        return !!root.postal_code || root.postalCode;
      }
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    cns_enabled: {
      type: GraphQLBoolean,
      description: 'true if Triton CNS is enabled for account',
      resolve: root => {
        return root.isUser ? null : !!root.triton_cns_enabled;
      }
    },
    keys: {
      type: new GraphQLList(KeyType),
      description: 'Get keys for user/account',
      args: {
        name: {
          type: GraphQLString,
          description: 'Filter on key name'
        },
        fingerprint: {
          type: GraphQLString,
          description: 'Filter on key fingerprint'
        }
      },
      resolve(root, args) {
        const _api = root.isUser ? api.keys.user : api.keys.account;

        const { list, get } = _api;

        const newArgs = Object.assign(args, {
          userId: root.id
        });

        const filtered = args.name || args.fingerprint;
        return !filtered ? list(newArgs) : get(newArgs).then(key => [key]);
      }
    },
    updated: {
      type: GraphQLString,
      description: "When this user/account's details was last updated"
    },
    created: {
      type: GraphQLString,
      description: 'When this user/account was created'
    }
  }
});
