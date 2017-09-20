import React from 'react';
import PropTypes from 'prop-types';
import paramCase from 'param-case';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetMetadata from '@graphql/list-metadata.gql';
import { KeyValue } from '@components/instances';

const Metadata = ({ metadata = [], loading, error }) => {
  const _title = <Title>Metadata</Title>;
  const _loading = !(loading && !forceArray(metadata).length) ? null : (
    <StatusLoader />
  );

  const metadataNames = Object.keys(metadata).map(name => ({
    key: paramCase(name),
    name
  }));

  const InstanceMetadataForm = reduxForm({
    form: `instance-tags`,
    initialValues: metadataNames.reduce(
      (all, { key, name }) => ({
        ...all,
        [`${key}-name`]: name,
        [`${key}-value`]: metadata[name]
      }),
      {}
    )
  })(KeyValue);

  const _tags = !_loading && (
    <InstanceMetadataForm keys={metadataNames.map(({ key }) => key)} />
  );

  const _error = !(error && !_loading) ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance metadata"
      error
    />
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_tags}
    </ViewContainer>
  );
};

Metadata.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetMetadata, {
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
