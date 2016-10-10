const AccountType = require('../types/login');
const api = require('../../api');

const {
  GraphQLBoolean,
  GraphQLString
} = require('graphql');

module.exports.updateAccount = {
  type: AccountType,
  description: 'Update your account details',
  args: {
    email: {
      type: GraphQLString
    },
    company_name: {
      type: GraphQLString
    },
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    postal_code: {
      type: GraphQLString
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
      type: GraphQLBoolean
    }
  },
  resolve: (root, args) => {
    return api.account.get().then((account) => {
      return api.account.update(Object.assign(account, args, {
        firstName: args.first_name || account.firstName,
        lastName: args.first_name || account.lastName,
        companyName: args.company_name || account.companyName,
        postalCode: args.postal_code || account.postalCode
      }));
    });
  }
};
