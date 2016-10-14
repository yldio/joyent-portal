const DynamicObjectType = require('./dynamic-object');

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql');

const CallerType = new GraphQLObjectType({
  name: 'CallerType',
  fields: {
    type: {
      type: GraphQLString,
      description: 'Authentication type for the action request. One of "basic", "operator", "signature" or "token"'
    },
    user: {
      type: GraphQLString,
      description: 'When the authentication type is "basic", this member will be present and include user login'
    },
    ip: {
      type: GraphQLString,
      description: 'The IP addresses this from which the action was requested. Not present if type is "operator"'
    },
    keyId: {
      type: GraphQLString,
      description: 'When authentication type is either "signature" or "token", SSH key identifier'
    }
  }
});

module.exports = new GraphQLObjectType({
  name: 'AuditType',
  fields: {
    action: {
      type: GraphQLString,
      description: 'The name of the action'
    },
    parameters: {
      type: DynamicObjectType,
      description: 'The original set of parameters sent when the action was requested'
    },
    success: {
      type: GraphQLBoolean,
      description: '`true` or `false`, depending on the action\'s success',
      resolve: (root) => {
        return root.success === 'yes';
      }
    },
    caller: {
      type: CallerType,
      description: 'Account requesting the action'
    },
    time: {
      type: GraphQLString,
      description: 'When the action finished'
    }
  }
});
