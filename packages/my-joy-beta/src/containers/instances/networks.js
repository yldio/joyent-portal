import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetNetworks from '@graphql/list-networks.gql';

const Networks = ({ networks = [], loading, error }) => {
  const _title = <Title>Networks</Title>;
  const _loading = !(loading && !forceArray(networks).length) ? null : (
    <StatusLoader />
  );

  const _summary = !_loading && <ReactJson src={networks} />;

  const _error = !(error && !_loading) ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance networks"
      error
    />
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_summary}
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
