import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import { CreateSnapshot as InstanceCreateSnapshot } from '@components/instances';
import CreateSnapshotMutation from '@graphql/create-snapshot.gql';
import GetInstance from '@graphql/get-instance.gql';

const CreateSnapshot = ({
  match,
  instance,
  loading,
  error,
  handleSubmit,
  handleCancel
}) => {
  const _loading = !(loading && !instance) ? null : <StatusLoader />;

  const CreateSnapshotForm = reduxForm({
    form: `create-snapshot-${match.params.instance}`
  })(InstanceCreateSnapshot);

  const _error = error &&
    !instance &&
    !_loading && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance
        </MessageDescription>
      </Message>
    );

  const _form = !loading &&
    !_error && (
      <CreateSnapshotForm onSubmit={handleSubmit} onCancel={handleCancel} />
    );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_form}
    </ViewContainer>
  );
};

export default compose(
  graphql(CreateSnapshotMutation, { name: 'createSnapshot' }),
  graphql(GetInstance, {
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
  }),
  connect(
    null,
    (dispatch, { history, location, instance, createSnapshot }) => ({
      handleCancel: () => history.push(location.pathname.split(/\/~/).shift()),
      handleSubmit: ({ name }) =>
        createSnapshot({
          variables: { name, id: instance.id }
        })
          .catch(error => {
            throw new SubmissionError({
              _error: error.graphQLErrors
                .map(({ message }) => message)
                .join('\n')
            });
          })
          .then(() => history.push(`/instances/${instance.name}/snapshots`))
    })
  )
)(CreateSnapshot);
