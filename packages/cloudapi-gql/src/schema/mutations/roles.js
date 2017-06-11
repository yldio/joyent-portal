const RoleType = require('../types/role');
const api = require('../../api');

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

module.exports.createRole = {
  type: RoleType,
  description: 'Create a new role for your account',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The role's name"
    },
    policies: {
      type: new GraphQLList(GraphQLString),
      description: "This account's policies to be given to this role (Optional)"
    },
    members: {
      type: new GraphQLList(GraphQLString),
      description:
        "This account's user logins to be added to this role (Optional)"
    },
    defaultMembers: {
      type: new GraphQLList(GraphQLString),
      description:
        "This account's user logins to be added to this role and have it enabled by default (Optional)"
    }
  },
  resolve: (root, args) => {
    return api.roles.create(args);
  }
};

module.exports.updateRole = {
  type: RoleType,
  description: 'Modifies an account role. Anything but id can be modified',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString,
      description: "The role's name"
    },
    policies: {
      type: new GraphQLList(GraphQLString),
      description: "This account's policies to be given to this role (Optional)"
    },
    members: {
      type: new GraphQLList(GraphQLString),
      description:
        "This account's user logins to be added to this role (Optional)"
    },
    defaultMembers: {
      type: new GraphQLList(GraphQLString),
      description:
        "This account's user logins to be added to this role and have it enabled by default (Optional)"
    }
  },
  resolve: (root, args) => {
    return api.roles.update(args);
  }
};

module.exports.deleteRole = {
  type: GraphQLID,
  description: 'Remove a role',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => {
    return api.roles.destroy(args).then(() => {
      return args.id;
    });
  }
};

module.exports.setRoleTags = {
  type: RoleType.tag,
  description:
    "Sets the given role tags to the provided resource path. resource_path can be the path to any of the CloudAPI resources described in this document: account, keys, users, roles, policies, user's ssh keys, datacenters, images, packages, instances, analytics, instrumentations, firewall rules and networks.",
  args: {
    resource: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The resource type e.g. `machines`, `policies`...'
    },
    id: {
      type: GraphQLID,
      description: 'The resource id'
    },
    role: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'The list role-tags to be added to this resource'
    }
  },
  resolve: (root, args) => {
    const { set } = api.roles;

    return set(args);
  }
};
