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

import ListDNS from '@graphql/list-dns.gql';

const DNS = ({ instance, loading, error }) => {
  const { name, dns_names } = instance || {};
  const _title = <Title>DNS</Title>;
  const _loading = loading && !name && !dns_names && <StatusLoader />;
  const _summary = !_loading && instance && <ReactJson src={dns_names} />;

  const _error = error &&
  !_loading &&
  !instance && (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>
        An error occurred while loading your instance DNS
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

DNS.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(ListDNS, {
    options: ({ match }) => ({
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
)(DNS);
