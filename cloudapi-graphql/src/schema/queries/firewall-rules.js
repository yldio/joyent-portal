const FirewallRuleType = require('../types/firewall-rule');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(FirewallRuleType),
  args: {
    id: {
      type: GraphQLID,
      description: 'Filter on id'
    }
  },
  resolve(root, args) {
    const { list, get } = api.firewallRules;

    return !args.id ? list() : get(args.id).then(rule => [rule]);
  }
};
