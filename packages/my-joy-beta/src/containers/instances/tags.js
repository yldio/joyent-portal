import React from 'react';
import paramCase from 'param-case';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import { SubmissionError, reset, stopSubmit } from 'redux-form';
import { connect } from 'react-redux';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import TagsComponent from '@components/instances/tags';

import GetTags from '@graphql/list-tags.gql';
import UpdateTags from '@graphql/update-tags.gql';
import DeleteTag from '@graphql/delete-tag.gql';

const TAG_FORM_KEY = (name, field) => `instance-tag-${name}-${field}`;
const CREATE_TAG_FORM_KEY = name => `instance-create-tag-${name}`;

const Tags = ({
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
  const _addKey = instance && CREATE_TAG_FORM_KEY(instance.name);

  // tags items forms
  const _tags = !_loading && (
    <TagsComponent
      handleCreate={handleCreate}
      handleClear={handleClear}
      addKey={_addKey}
      tags={values}
      handleRemove={handleRemove}
    />
  );

  // fetching error
  const _error =
    error && !values.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance tags
        </MessageDescription>
      </Message>
    ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_tags}
    </ViewContainer>
  );
};

export default compose(
  graphql(UpdateTags, { name: 'updateTags' }),
  graphql(DeleteTag, { name: 'deleteTag' }),
  graphql(GetTags, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, refetch, ...rest } }) => {
      const { name } = variables;

      const instance = find(get(rest, 'machines', []), ['name', name]);
      const tags = get(instance, 'tags', []);

      const values = tags.map(({ name, value }) => {
        const field = paramCase(name);
        const form = TAG_FORM_KEY(name, field);

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
    const { instance, refetch, updateTags, deleteTag } = ownProps;

    return {
      // reset sets values to initialValues
      handleClear: form => dispatch(reset(form)),
      handleRemove: name =>
        Promise.resolve(
          // set removing=true (so that we can have a specific removing spinner)
          // because remove button is not a submit button, we have to manually flip that flag
          dispatch([set({ name: `${name}-removing`, value: true })])
        )
          .then(() =>
            // call mutation
            deleteTag({
              variables: {
                id: instance.id,
                name
              }
            })
          )
          // fetch tags again
          .then(() => refetch())
          // we only flip removing and submitting when there is an error.
          // the reason for that is that tags is updated asyncronously and
          // it takes longer to have an efect than the mutation
          .catch(error =>
            dispatch([
              set({ name: `${name}-removing`, value: false }),
              stopSubmit(name, {
                _error: error.graphQLErrors
                  .map(({ message }) => message)
                  .join('\n')
              })
            ])
          ),
      handleCreate: ({ name, value }) =>
        // call mutation
        updateTags({
          variables: {
            id: instance.id,
            tags: [{ name, value }]
          }
        })
          // fetch tags again
          .then(() => refetch())
          // reset create new tags form
          .then(() => dispatch(reset(CREATE_TAG_FORM_KEY(instance.name))))
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
)(Tags);
