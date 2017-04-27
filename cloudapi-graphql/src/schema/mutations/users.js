const UserType = require('../types/login');
const api = require('../../api');

const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');

module.exports.createUser = {
  type: UserType,
  description: 'Creates a new user under an account',
  args: {
    login: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
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
    }
  },
  resolve: (root, args) => {
    return api.users.create(
      Object.assign(args, {
        firstName: args.first_name,
        lastName: args.first_name,
        companyName: args.company_name,
        postalCode: args.postal_code
      })
    );
  }
};

module.exports.deleteUser = {
  type: GraphQLID,
  description: 'Remove a user',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => {
    return api.users.destroy(args).then(() => {
      return args.id;
    });
  }
};

module.exports.updateUser = {
  type: UserType,
  description: "Update a user's modifiable properties",
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    login: {
      type: GraphQLString
    },
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
    }
  },
  resolve: (root, args) => {
    return api.users.update(
      Object.assign(args, {
        firstName: args.first_name,
        lastName: args.first_name,
        companyName: args.company_name,
        postalCode: args.postal_code
      })
    );
  }
};

// module.exports.changeUserPassword = {
//   type: UserType,
//   description: 'This is a separate rule for password changes, so different policies can be used for an user trying to modify other data, or only their own password',
//   args: {
//     id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     password: {
//       type: GraphQLString
//     },
//     password_confirmation: {
//       type: GraphQLString
//     }
//   },
//   resolve: (root, args) => {
//     return api.users.updatePassword(args);
//   }
// };
