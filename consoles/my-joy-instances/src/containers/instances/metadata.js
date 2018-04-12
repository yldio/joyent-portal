import React from 'react';
import paramCase from 'param-case';
import { Margin } from 'styled-components-spacing';
import { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError, reset, startSubmit, stopSubmit } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import find from 'lodash.find';
import get from 'lodash.get';
import intercept from 'apr-intercept';
import remcalc from 'remcalc';
import Fuse from 'fuse.js';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle,
  Divider,
  H3
} from 'joyent-ui-toolkit';

import GetMetadata from '@graphql/list-metadata.gql';
import UpdateMetadata from '@graphql/update-metadata.gql';
import DeleteMetadata from '@graphql/delete-metadata.gql';
import parseError from '@state/parse-error';
import ToolbarForm from '@components/instances/toolbar';
import Confirm from '@state/confirm';
import { addMetadata as validateMetadata } from '@state/validators';

import {
  AddForm as MetadataAddForm,
  EditForm as MetadataEditForm
} from '@components/instances/metadata';

const MENU_FORM_NAME = 'instance-metadata-list-menu';
const ADD_FORM_NAME = 'instance-metadata-add-new';
const METADATA_FORM_KEY = field => `instance-metadata-${paramCase(field)}`;

export const Metadata = ({
  metadata = [],
  addOpen,
  loading,
  error,
  shouldAsyncValidate,
  handleAsyncValidate,
  handleToggleAddOpen,
  handleUpdateExpanded,
  handleCancel,
  handleCreate,
  handleUpdate,
  handleRemove
}) => {
  const _loading = !(loading && !metadata.length) ? null : <StatusLoader />;

  const _add = addOpen ? (
    <ReduxForm
      form={ADD_FORM_NAME}
      onSubmit={handleCreate}
      shouldAsyncValidate={shouldAsyncValidate}
      asyncValidate={handleAsyncValidate}
    >
      {props => (
        <MetadataAddForm
          {...props}
          onCancel={() => handleToggleAddOpen(false)}
        />
      )}
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
        {metadata.length} key-value pair{metadata.length === 1 ? '' : 's'}
      </H3>
    </Margin>
  ) : null;

  const _metadata =
    !_loading &&
    metadata.map(({ form, initialValues, expanded, removing }) => (
      <Margin bottom={2}>
        <ReduxForm
          form={form}
          key={form}
          initialValues={initialValues}
          destroyOnUnmount={false}
          shouldAsyncValidate={shouldAsyncValidate}
          asyncValidate={handleAsyncValidate}
          onSubmit={handleUpdate}
        >
          {props => (
            <MetadataEditForm
              {...props}
              /* yeah, we need this here too */
              initialValues={initialValues}
              onToggleExpanded={() => handleUpdateExpanded(form, !expanded)}
              onCancel={() => handleCancel(form)}
              onRemove={() => handleRemove(form)}
              expanded={expanded}
              removing={removing}
            />
          )}
        </ReduxForm>
      </Margin>
    ));

  const _error =
    error && !_metadata.length && !_loading ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your metadata
          </MessageDescription>
        </Message>
      </Margin>
    ) : null;

  return (
    <ViewContainer main>
      <Margin bottom={4}>
        <ReduxForm form={MENU_FORM_NAME}>
          {props => (
            <ToolbarForm
              {...props}
              searchable={!_loading}
              searchLabel="Filter metadata"
              searchPlaceholder="Search by name or value"
              actionLabel="Add Metadata"
              actionable={!_loading}
              onActionClick={() => handleToggleAddOpen(!addOpen)}
            />
          )}
        </ReduxForm>
      </Margin>
      <Divider height={remcalc(11)} transparent />
      {_line}
      {_error}
      {_loading}
      {_add}
      {_count}
      {_metadata}
    </ViewContainer>
  );
};

export default compose(
  graphql(UpdateMetadata, { name: 'updateMetadata' }),
  graphql(DeleteMetadata, { name: 'deleteMetadata' }),
  graphql(GetMetadata, {
    options: ({ match }) => ({
      ssr: false,
      pollInterval: 1000,
      variables: {
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, machine, refetch, ...rest } }) => {
      const values = get(machine, 'metadata', []).filter(
        ({ name = '' }) => name !== 'user-script'
      );

      const metadata = values.map(({ id, name, value }) => ({
        id,
        form: METADATA_FORM_KEY(name),
        initialValues: {
          name,
          value
        }
      }));

      const index = new Fuse(values, {
        keys: ['name', 'value']
      });

      return {
        index,
        metadata,
        instance: machine,
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ values, form }, { metadata, index, ownProps }) => {
      // get search value
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);
      // if user is searching something, get items that match that query
      const filtered = filter
        ? index.search(filter).map(({ id }) => find(metadata, ['id', id]))
        : metadata;

      return {
        ...ownProps,
        addOpen: get(values, 'add-metadata-open', false),
        metadata: filtered.map(({ form, ...metadata }) => ({
          ...metadata,
          form,
          expanded: get(values, `${form}-expanded`, false),
          removing: get(values, `${form}-removing`, false)
        }))
      };
    },
    (dispatch, ownProps) => {
      const {
        instance,
        metadata,
        updateMetadata,
        deleteMetadata,
        refetch
      } = ownProps;

      return {
        handleCancel: form => {
          return dispatch([
            set({ name: `${form}-expanded`, value: false }),
            dispatch(reset(form))
          ]);
        },
        handleToggleAddOpen: value => {
          return dispatch(set({ name: `add-metadata-open`, value }));
        },
        handleUpdateExpanded: (form, expanded) => {
          return dispatch(set({ name: `${form}-expanded`, value: expanded }));
        },
        shouldAsyncValidate: ({ trigger }) => {
          return trigger === 'submit';
        },
        handleAsyncValidate: validateMetadata,
        handleCreate: async ({ name, value }) => {
          // call mutation
          const [err] = await intercept(
            updateMetadata({
              variables: {
                id: instance.id,
                metadata: [{ name, value }]
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
            // reset create new metadata form
            reset(ADD_FORM_NAME),
            stopSubmit(ADD_FORM_NAME),
            // close add form
            set({ name: `add-metadata-open`, value: false })
          ]);

          // fetch metadata again (even though we are polling)
          return refetch();
        },
        handleUpdate: async ({ name, value }, _, { form }) => {
          // call mutations
          const [err] = await intercept(
            Promise.all([
              deleteMetadata({
                variables: {
                  id: instance.id,
                  name: get(
                    find(metadata, ['form', form]),
                    'initialValues.name'
                  )
                }
              }),
              updateMetadata({
                variables: {
                  id: instance.id,
                  metadata: [{ name, value }]
                }
              })
            ])
          );

          if (err) {
            // show mutation error
            throw new SubmissionError({
              _error: parseError(err)
            });
          }

          dispatch([
            // reset form
            stopSubmit(form),
            // close card
            set({ name: `${form}-expanded`, value: false })
          ]);

          // fetch metadata again (even though we are polling)
          return refetch();
        },
        handleRemove: async form => {
          const name = get(
            find(metadata, ['form', form]),
            'initialValues.name'
          );

          if (!await Confirm(`Do you want to remove "${name}"?`)) {
            return;
          }

          dispatch([
            set({ name: `${form}-removing`, value: true }),
            startSubmit(form)
          ]);

          // call mutation
          const [err] = await intercept(
            deleteMetadata({
              variables: {
                id: instance.id,
                name
              }
            })
          );

          const flipSubmitFalse = stopSubmit(form, {
            _error: err && parseError(err)
          });

          dispatch([
            flipSubmitFalse,
            set({ name: `${form}-removing`, value: false })
          ]);

          // fetch metadata again (even though we are polling)
          return refetch();
        }
      };
    }
  )
)(Metadata);
