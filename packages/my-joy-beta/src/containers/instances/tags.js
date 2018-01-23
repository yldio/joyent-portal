import React from 'react';
import { Margin } from 'styled-components-spacing';
import paramCase from 'param-case';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import { SubmissionError, reset, stopSubmit, startSubmit } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import find from 'lodash.find';
import get from 'lodash.get';
import intercept from 'apr-intercept';
import remcalc from 'remcalc';

import {
  ViewContainer,
  StatusLoader,
  Divider,
  H3,
  TagList
} from 'joyent-ui-toolkit';

import {
  default as Tag,
  AddForm as TagsAddForm,
  EditForm as TagsEditForm
} from '@components/tags';

import ToolbarForm from '@components/instances/toolbar';
import GetTags from '@graphql/list-tags.gql';
import UpdateTags from '@graphql/update-tags.gql';
import DeleteTag from '@graphql/delete-tag.gql';
import Index from '@state/gen-index';
import parseError from '@state/parse-error';

const MENU_FORM_NAME = 'instance-tags-list-menu';
const ADD_FORM_NAME = 'instance-tags-add-new';
const EDIT_FORM_KEY = field => `instance-tags-${paramCase(field)}`;

export const Tags = ({
  tags = [],
  addOpen,
  editing,
  editable,
  loading,
  handleToggleAddOpen,
  handleToggleEditing,
  handleCancel,
  handleEdit,
  handleRemove,
  handleCreate
}) => {
  const _loading = !(loading && !tags.length) ? null : <StatusLoader />;

  const _add = addOpen ? (
    <ReduxForm
      form={ADD_FORM_NAME}
      onSubmit={handleCreate}
      onCancel={() => handleToggleAddOpen(false)}
    >
      {TagsAddForm}
    </ReduxForm>
  ) : null;

  const _line = !_loading
    ? [
        <Divider key="line" height={remcalc(1)} />,
        <Divider key="after-line-space" height={remcalc(24)} transparent />
      ]
    : null;

  const _count = !_loading ? (
    <Margin bottom={4} top={addOpen && 4}>
      <H3>
        {tags.length} tag{tags.length === 1 ? '' : 's'}
      </H3>
    </Margin>
  ) : null;

  const _tags = !_loading ? (
    <TagList>
      {tags.map(({ id, name, value }) => (
        <Tag
          key={id}
          id={id}
          name={name}
          value={value}
          onClick={editable && !editing && (() => handleToggleEditing(name))}
        />
      ))}
    </TagList>
  ) : null;

  const _edit = editing ? (
    <ReduxForm
      form={editing.form}
      initialValues={{ name: editing.name, value: editing.value }}
      onSubmit={handleEdit}
    >
      {props => (
        <TagsEditForm
          {...props}
          /* yeah, we need this here too */
          initialValues={{ name: editing.name, value: editing.value }}
          onCancel={() => handleToggleEditing(false)}
          onToggleExpanded={() => handleToggleEditing(false)}
          onRemove={() => handleRemove(editing.form, editing)}
          removing={editing.removing}
        />
      )}
    </ReduxForm>
  ) : null;

  return (
    <ViewContainer main>
      <ReduxForm form={MENU_FORM_NAME}>
        {props => (
          <ToolbarForm
            {...props}
            searchable={!_loading}
            searchLabel="Filter tags"
            searchPlaceholder="Search by name or value"
            actionLabel="Add Tag"
            actionable={!editing}
            onActionClick={() => handleToggleAddOpen(!addOpen)}
          />
        )}
      </ReduxForm>
      <Divider height={remcalc(11)} transparent />
      {_line}
      {_loading}
      {_add}
      {_edit}
      {_count}
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

      return {
        tags,
        instance,
        index: Index(tags),
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ values, form }, { tags, index, ...ownProps }) => {
      // get search value
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);
      // if user is searching something, get items that match that query
      const filtered = filter
        ? index.search(filter).map(({ ref }) => find(tags, ['id', ref]))
        : tags;

      const addOpen = get(values, 'add-tags-open', false);
      const editingTagName = get(values, 'editing-tag', null);
      const removingTagName = get(values, 'removing-tag', null);
      const removingTag = editingTagName === removingTagName;
      const editingTag =
        editingTagName && find(filtered, ['name', editingTagName]);

      return {
        ...ownProps,
        tags: filtered,
        addOpen,
        // are existing tags editable?
        editable: !addOpen && !editingTag,
        // if a tag is being edited, which one?
        editing: editingTag && {
          ...editingTag,
          removing: Boolean(removingTag),
          form: EDIT_FORM_KEY(editingTag.name)
        }
      };
    },
    (dispatch, ownProps) => {
      return {
        handleToggleAddOpen: value =>
          dispatch(set({ name: `add-tags-open`, value })),
        handleToggleEditing: value =>
          dispatch(set({ name: `editing-tag`, value })),
        handleEdit: async ({ name, value }, _, { form, initialValues }) => {
          const { instance, deleteTag, updateTags, refetch } = ownProps;

          const replaceTag = async () => {
            // we can't mutate in parallel because if the tag name is the
            // same we can have a race condition and remove after updating

            await updateTags({
              variables: {
                id: instance.id,
                tags: [{ name, value }]
              }
            });

            await deleteTag({
              variables: {
                id: instance.id,
                name: initialValues.name
              }
            });
          };

          const updateValue = async () => {
            await updateTags({
              variables: {
                id: instance.id,
                tags: [{ name, value }]
              }
            });
          };

          const mutation =
            initialValues.name === name ? updateValue : replaceTag;

          const [err] = await intercept(mutation());

          if (err) {
            // show mutation error
            throw new SubmissionError({
              _error: parseError(err)
            });
          }

          dispatch([
            set({ name: `editing-tag`, value: false }),
            reset(form),
            startSubmit(form)
          ]);

          // fetch tags again (even though we are polling)
          return refetch();
        },
        handleRemove: async (form, { name }) => {
          const { instance, deleteTag, refetch } = ownProps;

          dispatch([
            set({ name: `removing-tag`, value: name }),
            startSubmit(form)
          ]);

          // call mutation
          const [err] = await intercept(
            deleteTag({
              variables: {
                id: instance.id,
                name
              }
            })
          );

          if (err) {
            // show mutation error
            throw new SubmissionError({
              _error: parseError(err)
            });
          }

          dispatch([
            set({ name: `editing-tag`, value: false }),
            set({ name: `removing-tag`, value: false }),
            reset(form),
            startSubmit(form)
          ]);

          // fetch tags again (even though we are polling)
          return refetch();
        },
        handleCreate: async ({ name, value }) => {
          const { updateTags, instance, refetch } = ownProps;

          // call mutation
          const [err] = await intercept(
            updateTags({
              variables: {
                id: instance.id,
                tags: [{ name, value }]
              }
            })
          );

          if (err) {
            // show mutation error
            throw new SubmissionError({
              _error: parseError(err)
            });
          }

          dispatch([
            // reset create new tags form
            reset(ADD_FORM_NAME),
            stopSubmit(ADD_FORM_NAME),
            // close add form
            set({ name: `add-tags-open`, value: false })
          ]);

          // fetch tags again (even though we are polling)
          return refetch();
        }
      };
    }
  )
)(Tags);
