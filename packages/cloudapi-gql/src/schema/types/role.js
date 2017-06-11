const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'RoleType',
  description:
    'Roles are lists of users and policies. Roles describe which users are allowed access according to the policies',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this role'
    },
    name: {
      type: GraphQLString,
      description: 'The role name'
    },
    policies: {
      type: new GraphQLList(GraphQLString),
      description: "This account's policies which this role obeys (Optional)"
    },
    members: {
      type: new GraphQLList(GraphQLString),
      description: "This account's user logins this role applies to (Optional)"
    },
    defaultMembers: {
      type: new GraphQLList(GraphQLString),
      description:
        "This account's user logins this role applies to by default (Optional)"
    }
  }
});

module.exports.tag = new GraphQLObjectType({
  name: 'RoleTagType',
  fields: {
    name: {
      type: GraphQLString,
      description: 'Path to the resource'
    },
    roleTag: {
      type: new GraphQLList(GraphQLString),
      description: 'The role name',
      resolve: root => {
        return root['role-tag'] || root.roleTag;
      }
    }
  }
});
