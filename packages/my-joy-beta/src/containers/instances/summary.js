import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';
import copy from 'clipboard-copy';
import {
  ViewContainer,
  Input,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle,
  Button,
  H6
} from 'joyent-ui-toolkit';

import GetInstance from '@graphql/get-instance.gql';

const Summary = ({ instance, loading, error }) => {
  const { name } = instance || {};

  console.log(instance);

  const _loading = loading && !name && <StatusLoader />;
  const _summary = !_loading &&
    instance && [
      <H6>Short ID</H6>,
      <Input value={instance.id.split('-')[0]} />,
      <Button onClick={() => copy(instance.id.split('-')[0])}>Copy</Button>,
      <H6>ID</H6>,
      <Input value={instance.id} />,
      <Button onClick={() => copy(instance.id)}>Copy</Button>,
      <ReactJson src={instance} />
    ];

  const _error = error &&
    !_loading &&
    !instance && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance summary
        </MessageDescription>
      </Message>
    );

  return (
    <ViewContainer center={Boolean(_loading)} main>
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
