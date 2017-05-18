const AccountType = require('../types/login');
const api = require('../../api');

const { GraphQLBoolean, GraphQLString } = require('graphql');

module.exports.updateAccount = {
  type: AccountType,
  description: 'Update your account details',
  args: {
    email: {
      type: GraphQLString
    },
    companyName: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    postalCode: {
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
    cnsEnabled: {
      type: GraphQLBoolean
    }
  },
  resolve: (root, args) => {
    return api.account.get().then(account => {
      return api.account.update(
        Object.assign(account, args, {
          firstName: args.firstName || account.firstName,
          lastName: args.firstName || account.lastName,
          companyName: args.companyName || account.companyName,
          postalCode: args.postalCode || account.postalCode
        })
      );
    });
  }
};
