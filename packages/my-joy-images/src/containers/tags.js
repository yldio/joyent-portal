import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { set } from 'react-redux-values';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import remcalc from 'remcalc';
import Fuse from 'fuse.js';

import {
  H3,
  ViewContainer,
  StatusLoader,
  Divider,
  Message,
  MessageTitle,
  MessageDescription,
  TagList
} from 'joyent-ui-toolkit';

import { Forms } from '@root/constants';
import Tag, { AddForm } from '@components/tags';
import ToolbarForm from '@components/toolbar';
import UpdateImageTags from '@graphql/update-image-tags.gql';
import GetTags from '@graphql/get-tags.gql';
import { addTag as validateTag } from '@state/validators';
import parseError from '@state/parse-error';

const { TAGS_TOOLBAR_FORM, TAGS_ADD_FORM } = Forms;

export const Tags = ({
  tags = [],
  addOpen = false,
  loading = false,
  error = null,
  mutationError = null,
  mutating = false,
  handleAsyncValidate,
  shouldAsyncValidate,
  handleToggleAddOpen,
  handleRemoveTag,
  handleAddTag
}) => (
  <ViewContainer main>
    <ReduxForm form={TAGS_TOOLBAR_FORM}>
      {props => (
        <Margin bottom="4">
          <ToolbarForm
            {...props}
            searchable={!loading}
            actionLabel="Add Tag"
            actionable={!loading && !mutating && !addOpen}
            onActionClick={handleToggleAddOpen}
            action
          />
          <Divider height={remcalc(1)} />
        </Margin>
      )}
    </ReduxForm>
    {error && !loading && !tags.length ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your instance tags
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {mutationError ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>{mutationError}</MessageDescription>
        </Message>
      </Margin>
    ) : null}
    <ReduxForm
      form={TAGS_ADD_FORM}
      asyncValidate={handleAsyncValidate}
      shouldAsyncValidate={shouldAsyncValidate}
      onSubmit={handleAddTag}
    >
      {props =>
        addOpen ? (
          <Margin bottom={4}>
            <AddForm
              {...props}
              onToggleExpanded={() => handleToggleAddOpen(!addOpen)}
              onCancel={() => handleToggleAddOpen(!addOpen)}
            />
          </Margin>
        ) : null
      }
    </ReduxForm>
    {!loading ? (
      <Margin bottom={4}>
        <H3>
          {tags.length} tag{tags.length === 1 ? '' : 's'}
        </H3>
      </Margin>
    ) : null}
    {loading && !tags.length ? <StatusLoader /> : null}
    <TagList>
      {tags.map(({ name, value }) => (
        <Tag
          key={value}
          name={name}
          value={value}
          onRemoveClick={!mutating && (() => handleRemoveTag(name))}
          active
        />
      ))}
    </TagList>
  </ViewContainer>
);

export default compose(
  graphql(UpdateImageTags, {
    name: 'updateTags'
  }),
  graphql(GetTags, {
    options: ({ match }) => ({
      ssr: false,
      fetchPolicy: 'network-only',
      pollInterval: 1000,
      variables: {
        id: get(match, 'params.image')
      }
    }),
    props: ({ data }) => {
      const { loading = false, error = null, image, refetch } = data;

      const tags = get(image || {}, 'tags', []);
      const index = new Fuse(tags, {
        keys: ['name', 'value']
      });

      return {
        index,
        image: image || {},
        tags,
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ values, form }, { index, tags, image }) => {
      const filter = get(form, `${TAGS_TOOLBAR_FORM}.values.filter`, false);
      const filtered = filter ? index.search(filter) : tags;

      return {
        tags: filtered,
        addOpen: get(values, `${image.id}-add-open`, false),
        mutationError: get(values, `${image.id}-mutation-error`, false),
        mutating: get(values, `${image.id}-mutating`, false)
      };
    },
    (dispatch, { image, tags = [], updateTags, refetch }) => ({
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'submit';
      },
      handleAsyncValidate: validateTag,
      handleToggleAddOpen: addOpen => {
        dispatch(set({ name: `${image.id}-add-open`, value: addOpen }));
      },
      handleRemoveTag: async name => {
        dispatch(set({ name: `${image.id}-mutating`, value: true }));

        const [err] = await intercept(
          updateTags({
            variables: {
              id: image.id,
              tags: tags
                .map(({ name, value }) => ({ name, value }))
                .filter(tag => tag.name !== name)
            }
          })
        );

        if (err) {
          dispatch([
            set({ name: `${image.id}-mutation-error`, value: parseError(err) }),
            set({ name: `${image.id}-mutating`, value: false })
          ]);
        }

        await refetch();

        dispatch(set({ name: `${image.id}-mutating`, value: false }));
      },
      handleAddTag: async ({ name, value }) => {
        dispatch(set({ name: `${image.id}-mutating`, value: true }));

        const [err] = await intercept(
          updateTags({
            variables: {
              id: image.id,
              tags: tags
                .map(({ name, value }) => ({ name, value }))
                .concat([{ name, value }])
            }
          })
        );

        if (err) {
          dispatch([
            set({ name: `${image.id}-mutation-error`, value: parseError(err) }),
            set({ name: `${image.id}-mutating`, value: false })
          ]);
        }

        await refetch();

        dispatch([
          set({ name: `${image.id}-mutating`, value: false }),
          dispatch(set({ name: `${image.id}-add-open`, value: false })),
          destroy(TAGS_ADD_FORM)
        ]);
      }
    })
  )
)(Tags);
