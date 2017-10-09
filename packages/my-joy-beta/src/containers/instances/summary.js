import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  Title,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import GetInstance from '@graphql/get-instance.gql';

const Summary = ({ instance = {}, loading, error }) => {
  const { name } = instance;

  const _title = <Title>Summary</Title>;
  const _loading = !(loading && !name) ? null : <StatusLoader />;
  const _summary = !_loading && <ReactJson src={instance} />;

  const _error = !(error && !_loading) ? null : (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>
        An error occurred while loading your instance summary
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

Summary.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetInstance, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      instance: find(get(rest, 'machines', []), ['name', variables.name]),
      loading,
      error
    })
  })
)(Summary);
