const FirewallRuleType = require('../types/firewall-rule');
const api = require('../../api');

const { GraphQLID, GraphQLBoolean, GraphQLString } = require('graphql');

module.exports.createFirewallRule = {
  type: FirewallRuleType,
  description:
    "Adds a new firewall rule for the specified account. This rule will be added to all the account's instances where it may be necessary",
  args: {
    enabled: {
      type: GraphQLBoolean,
      description:
        'Indicates if the rule is enabled (optional, false by default)'
    },
    rule: {
      type: GraphQLString,
      description: 'Firewall rule text'
    },
    description: {
      type: GraphQLString,
      description: 'Human-readable description for the rule (optional)'
    }
  },
  resolve: (root, args) => {
    return api.firewallRules.create({
      rule: args.rule,
      description: args.description,
      enabled: Boolean(args.enabled)
    });
  }
};

module.exports.updateFirewallRule = {
  type: FirewallRuleType,
  description:
    'Updates the given rule record and -- depending on rule contents -- adds/removes/updates the rule on all the required instances',
  args: {
    id: {
      type: GraphQLID,
      description: 'Firewall rule id'
    },
    enabled: {
      type: GraphQLBoolean,
      description:
        'Indicates if the rule is enabled (optional, false by default)'
    },
    rule: {
      type: GraphQLString,
      description: 'Firewall rule text'
    },
    description: {
      type: GraphQLString,
      description: 'Human-readable description for the rule (optional)'
    }
  },
  resolve: (root, args) => {
    return api.firewallRules.update(args);
  }
};

module.exports.enableFirewallRule = {
  type: FirewallRuleType,
  description: 'Enables the given firewall rule if it is disabled',
  args: {
    id: {
      type: GraphQLID,
      description: 'Firewall rule id'
    }
  },
  resolve: (root, args) => {
    return api.firewallRules.enable(args);
  }
};

module.exports.disableFirewallRule = {
  type: FirewallRuleType,
  description: 'Disables the given firewall rule if it is enabled',
  args: {
    id: {
      type: GraphQLID,
      description: 'Firewall rule id'
    }
  },
  resolve: (root, args) => {
    return api.firewallRules.disable(args);
  }
};

module.exports.deleteFirewallRule = {
  type: FirewallRuleType,
  description:
    'Removes the given firewall rule from all the required instances',
  args: {
    id: {
      type: GraphQLID,
      description: 'Firewall rule id'
    }
  },
  resolve: (root, args) => {
    return api.firewallRules.destroy(args);
  }
};
