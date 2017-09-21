import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import TagsQuery from '@graphql/tags.gql';

const Tags = ({ tags = [], loading, error }) => {
  const _title = <Title>Tags</Title>;
  const _loading = !(loading && !forceArray(tags).length) ? null : (
    <StatusLoader />
  );

  const _summary = !_loading && <ReactJson src={tags} />;

  const _error = !(error && !_loading) ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance tags"
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

Tags.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(TagsQuery, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      tags: get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'tags',
        []
      ),
      loading,
      error
    })
  })
)(Tags);
