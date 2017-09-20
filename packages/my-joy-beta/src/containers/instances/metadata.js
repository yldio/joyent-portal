import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import MetadataQuery from '@graphql/metadata.gql';

const Metadata = ({ metadata = [], loading, error }) => {
  const _title = <Title>Metadata</Title>;
  const _loading = !(loading && !forceArray(metadata).length) ? null : (
    <StatusLoader />
  );

  const _summary = !_loading && <ReactJson src={metadata} />;

  const _error = !(error && !_loading) ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance metadata"
      error
    />
  );

  return (
    <ViewContainer center={Boolean(_loading)}>
      {_title}
      {_loading}
      {_error}
      {_summary}
    </ViewContainer>
  );
};

Metadata.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(MetadataQuery, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      metadata: get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'metadata',
        []
      ),
      loading,
      error
    })
  })
)(Metadata);
