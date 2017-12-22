import React from 'react';
import paramCase from 'param-case';
import Value, { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError, reset, startSubmit, stopSubmit } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import find from 'lodash.find';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle,
  Button
} from 'joyent-ui-toolkit';

import GetMetadata from '@graphql/list-metadata.gql';
import UpdateMetadata from '@graphql/update-metadata.gql';
import DeleteMetadata from '@graphql/delete-metadata.gql';
import { KeyValue } from '@components/instances';

const METADATA_FORM_KEY = (name, field) => `instance-metadata-${name}-${field}`;
const CREATE_METADATA_FORM_KEY = name => `instance-create-metadata-${name}`;

const Metadata = ({
  instance,
  values = [],
  loading,
  error,
  handleRemove,
  handleClear,
  handleUpdate,
  handleCreate
}) => {
  const _loading = !(loading && !values.length) ? null : <StatusLoader />;

  // metadata items forms
  const _metadata =
    !_loading &&
    values.map(({ form, initialValues }, i) => (
      <Value name={`${form}-expanded`} key={form}>
        {({ value: expanded, onValueChange }) => (
          <ReduxForm
            form={form}
            initialValues={initialValues}
            onSubmit={newValues => handleUpdate(newValues, form)}
            destroyOnUnmount
            id={form}
            onClear={() => handleClear(form)}
            onToggleExpanded={() => onValueChange(!expanded)}
            onRemove={() => handleRemove(form)}
            label="metadata"
            last={values.length - 1 === i}
            first={i === 0}
            expanded={expanded}
            textarea
          >
            {KeyValue}
          </ReduxForm>
        )}
      </Value>
    ));

  // create metadata form
  const _addKey = instance && CREATE_METADATA_FORM_KEY(instance.name);
  const _add = _metadata &&
    _addKey && (
      <Value name={`${_addKey}-expanded`}>
        {({ value: expanded, onValueChange }) =>
          !expanded ? (
            <Button
              type="button"
              onClick={() => onValueChange(!expanded)}
              secondary
            >
              Add metadata
            </Button>
          ) : (
            <ReduxForm
              form={_addKey}
              onSubmit={handleCreate}
              id={_addKey}
              onClear={() => handleClear(_addKey)}
              onToggleExpanded={() => onValueChange(!expanded)}
              onRemove={() => handleRemove(_addKey)}
              expanded={expanded}
              label="metadata"
              create
              textarea
            >
              {KeyValue}
            </ReduxForm>
          )}
      </Value>
    );

  // fetching error
  const _error =
    error && !values.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance metadata
        </MessageDescription>
      </Message>
    ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_metadata}
      {_add}
    </ViewContainer>
  );
};

export default compose(
  graphql(UpdateMetadata, { name: 'updateMetadata' }),
  graphql(DeleteMetadata, { name: 'deleteMetadata' }),
  graphql(GetMetadata, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, refetch, ...rest } }) => {
      const { name } = variables;

      const instance = find(get(rest, 'machines', []), ['name', name]);
      const metadata = get(instance, 'metadata', []);

      const values = sortBy(metadata, 'name').map(({ name, value }) => {
        const field = paramCase(name);
        const form = METADATA_FORM_KEY(name, field);

        return {
          form,
          initialValues: {
            name,
            value
          }
        };
      });

      return {
        values,
        instance,
        loading,
        error,
        refetch
      };
    }
  }),
  connect(null, (dispatch, ownProps) => {
    const {
      instance,
      values,
      refetch,
      updateMetadata,
      deleteMetadata
    } = ownProps;

    return {
      // reset sets values to initialValues
      handleClear: form => dispatch(reset(form)),
      handleRemove: form =>
        Promise.resolve(
          // set removing=true (so that we can have a specific removing spinner)
          // because remove button is not a submit button, we have to manually flip that flag
          dispatch([
            set({ name: `${form}-removing`, value: true }),
            startSubmit(form)
          ])
        )
          .then(() =>
            // call mutation. get key from values' initialValues
            deleteMetadata({
              variables: {
                id: instance.id,
                name: get(find(values, ['form', form]), 'initialValues.name')
              }
            })
          )
          // fetch metadata again
          .then(() => refetch())
          // we only flip removing and submitting when there is an error.
          // the reason for that is that metadata is updated asyncronously and
          // it takes longer to have an efect than the mutation
          .catch(error =>
            dispatch([
              set({ name: `${form}-removing`, value: false }),
              stopSubmit(form, {
                _error: error.graphQLErrors
                  .map(({ message }) => message)
                  .join('\n')
              })
            ])
          ),
      handleUpdate: ({ name, value }, form) =>
        // call mutation. delete existing metadata, add new
        Promise.all([
          deleteMetadata({
            variables: {
              id: instance.id,
              name: get(find(values, ['form', form]), 'initialValues.name')
            }
          }),
          updateMetadata({
            variables: {
              id: instance.id,
              metadata: [{ name, value }]
            }
          })
        ])
          // fetch metadata again
          .then(() => refetch())
          // submit is flipped once the promise is resolved
          .catch(error => {
            throw new SubmissionError({
              _error: error.graphQLErrors
                .map(({ message }) => message)
                .join('\n')
            });
          }),
      handleCreate: ({ name, value }) =>
        // call mutation
        updateMetadata({
          variables: {
            id: instance.id,
            metadata: [{ name, value }]
          }
        })
          // fetch metadata again
          .then(() => refetch())
          // reset create new metadata form
          .then(() => dispatch(reset(CREATE_METADATA_FORM_KEY(instance.name))))
          // submit is flipped once the promise is resolved
          .catch(error => {
            throw new SubmissionError({
              _error: error.graphQLErrors
                .map(({ message }) => message)
                .join('\n')
            });
          })
    };
  })
)(Metadata);
