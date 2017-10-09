import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  Title,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import GetSnapshots from '@graphql/list-snapshots.gql';

const Snapshots = ({ snapshots = [], loading, error }) => {
  const _title = <Title>Snapshots</Title>;
  const _loading = !(loading && !forceArray(snapshots).length) ? null : (
    <StatusLoader />
  );

  const _summary = !_loading && <ReactJson src={snapshots} />;

  const _error = !(error && !_loading) ? null : (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>
        An error occurred while loading your instance snapshots
      </MessageDescription>
    </Message>
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

Snapshots.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetSnapshots, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      snapshots: get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'snapshots',
        []
      ),
      loading,
      error
    })
  })
)(Snapshots);
