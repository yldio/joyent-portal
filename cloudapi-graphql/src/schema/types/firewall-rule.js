const api = require('../../api');

const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt
} = require('graphql');

const FirewallRuleSyntaxType = new GraphQLObjectType({
  name: 'FirewallRuleSyntaxType',
  fields: {
    text: {
      type: GraphQLString
    },
    from: {
      type: GraphQLString
    },
    to: {
      type: GraphQLString
    },
    action: {
      type: GraphQLString
    },
    protocol: {
      type: GraphQLString
    },
    port: {
      type: GraphQLInt
    }
  }
});

module.exports = new GraphQLObjectType({
  name: 'FirewallRuleType',
  // function to allow circular dependencies
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Unique identifier for this rule'
    },
    enabled: {
      type: GraphQLBoolean,
      description: 'Indicates if the rule is enabled',
      resolve: root => {
        return !!root.enabled;
      }
    },
    rule: {
      type: FirewallRuleSyntaxType,
      description: 'Firewall rule',
      resolve: ({ rule }) => {
        const regex = /from (.*?) to (.*?) (allow|deny) (.*?) port (\d*)/i;
        const tokens = rule.match(regex);

        return {
          from: tokens[1],
          to: tokens[2],
          action: tokens[3],
          protocol: tokens[4],
          port: tokens[5],
          text: rule
        };
      }
    },
    global: {
      type: GraphQLBoolean,
      description: 'Indicates if the rule is global',
      resolve: root => {
        return !!root.global;
      }
    },
    description: {
      type: GraphQLString,
      description: 'Human-readable description for the rule'
    },
    machines: {
      // circular dependency
      type: new GraphQLList(require('./machine')),
      description: 'Lists all instances a firewall rule is applied to',
      resolve: root => {
        return api.firewallRules.listMachines({
          id: root.id
        });
      }
    }
  })
});
