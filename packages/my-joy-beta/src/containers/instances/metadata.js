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
  handleToggleAddOpen,
  handleUpdateExpanded,
  handleCancel,
  handleCreate,
  handleUpdate,
  handleRemove,
  shouldAsyncValidate,
  asyncValidate
}) => {
  const _loading = !(loading && !metadata.length) ? null : <StatusLoader />;

  const _add = addOpen ? (
    <ReduxForm
      form={ADD_FORM_NAME}
      onSubmit={handleCreate}
      shouldAsyncValidate={shouldAsyncValidate}
      asyncValidate={asyncValidate}
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
        {metadata.length} key:value pair{metadata.length === 1 ? '' : 's'}
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
          onSubmit={handleUpdate}
          shouldAsyncValidate={shouldAsyncValidate}
          asyncValidate={asyncValidate}
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
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, refetch, ...rest } }) => {
      const { name } = variables;

      const instance = find(get(rest, 'machines', []), ['name', name]);
      const values = get(instance, 'metadata', []).filter(
        ({ name = '' }) => name !== 'user-script'
      );

      const metadata = values.map(({ name, value }) => ({
        form: METADATA_FORM_KEY(name),
        initialValues: {
          name,
          value
        }
      }));

      return {
        metadata,
        instance,
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ values }, { metadata, ownProps }) => ({
      ...ownProps,
      addOpen: get(values, 'add-metadata-open', false),
      metadata: metadata.map(({ form, ...metadata }) => ({
        ...metadata,
        form,
        expanded: get(values, `${form}-expanded`, false),
        removing: get(values, `${form}-removing`, false)
      }))
    }),
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
        asyncValidate: async ({ name = '', value = '' }) => {
          const isNameInvalid = name.length === 0;
          const isValueInvalid = value.length === 0;

          if (!isNameInvalid && !isValueInvalid) {
            return;
          }

          throw {
            name: isNameInvalid,
            value: isValueInvalid
          };
        },
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
