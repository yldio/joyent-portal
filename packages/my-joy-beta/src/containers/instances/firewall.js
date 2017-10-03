import React from 'react';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetFirewallRules from '@graphql/list-firewall-rules.gql';
import { FirewallRule as InstanceFirewallRule } from '@components/instances';

const Firewall = ({
  // eslint-disable-next-line camelcase
  firewallEnabled = false,
  firewallRules = [],
  loading,
  error
}) => {
  const values = forceArray(firewallRules);
  const _title = <Title>Firewall</Title>;
  const _loading = !(loading && !values.length) ? null : <StatusLoader />;

  const _firewall =
    !_loading &&
    values.map((rule, i, all) => (
      <InstanceFirewallRule
        key={rule.id}
        {...rule}
        last={all.length - 1 === i}
        first={!i}
      />
    ));

  const _error = (error && !values.length && !_loading) ? (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance firewall rules"
      error
    />
  ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_firewall}
    </ViewContainer>
  );
};

Firewall.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetFirewallRules, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const machine = find(get(rest, 'machines', []), ['name', variables.name]);
      // eslint-disable-next-line camelcase
      const firewallEnabled = get(machine, 'firewall_enabled', false);
      const firewallRules = get(machine, 'firewall_rules', []);

      // eslint-disable-next-line camelcase
      return { firewallEnabled, firewallRules, loading, error };
    }
  })
)(Firewall);
