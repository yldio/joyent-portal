import React from 'react';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetNetworks from '@graphql/list-networks.gql';
import { Network as InstanceNetwork } from '@components/instances';

const Networks = ({ networks = [], loading, error }) => {
  const values = forceArray(networks);
  const _title = <Title>Networks</Title>;
  const _loading = !(loading && !values.length) ? null : <StatusLoader />;

  console.log(values);

  const _networks =
    !_loading &&
    values.map((network, i, all) => (
      <InstanceNetwork
        key={network.id}
        {...network}
        last={all.length - 1 === i}
        first={!i}
      />
    ));

  const _error =
    error && !values.length && !_loading ? (
      <Message
        title="Ooops!"
        message="An error occurred while loading your instance networks"
        error
      />
    ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_networks}
    </ViewContainer>
  );
};

Networks.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetNetworks, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      networks: get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'networks',
        []
      ),
      loading,
      error
    })
  })
)(Networks);
