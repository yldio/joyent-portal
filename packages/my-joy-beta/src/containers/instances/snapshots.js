import React from 'react';
import forceArray from 'force-array';
import { connect } from 'react-redux';
import { stopSubmit, startSubmit, change, reset } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';
import sort from 'lodash.sortby';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  StatusLoader
} from 'joyent-ui-toolkit';

import GetSnapshots from '@graphql/list-snapshots.gql';
import StartSnapshot from '@graphql/start-from-snapshot.gql';
import RemoveSnapshot from '@graphql/remove-snapshot.gql';
import CreateSnapshotMutation from '@graphql/create-snapshot.gql';
import GenIndex from '@state/gen-index';
import ToolbarForm from '@components/instances/toolbar';
import SnapshotsListActions from '@components/instances/footer';
import parseError from '@state/parse-error';

import {
  default as SnapshotsList,
  AddForm as SnapshotAddForm
} from '@components/instances/snapshots';

const MENU_FORM_NAME = 'snapshot-list-menu';
const TABLE_FORM_NAME = 'snapshot-list-table';
const CREATE_FORM_NAME = 'create-snapshot-form';

const Snapshots = ({
  snapshots = [],
  instance = {},
  selected = [],
  loading,
  submitting,
  error,
  mutationError,
  allowedActions,
  statuses,
  handleAction,
  handleCreateSnapshot,
  sortOrder,
  handleSortBy,
  sortBy,
  toggleSelectAll,
  toggleCreateSnapshotOpen,
  createSnapshotOpen
}) => {
  const _values = forceArray(snapshots);
  const _loading = !_values.length && loading ? <StatusLoader /> : null;

  const handleStart = selected => handleAction({ name: 'start', selected });
  const handleRemove = selected => handleAction({ name: 'remove', selected });

  const _error = error &&
    !_loading &&
    !_values.length && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance snapshots
        </MessageDescription>
      </Message>
    );

  const _createSnapshot =
    !loading && createSnapshotOpen ? (
      <ReduxForm form={CREATE_FORM_NAME} onSubmit={handleCreateSnapshot}>
        {props => (
          <Margin top={5}>
            <SnapshotAddForm
              {...props}
              onCancel={() => toggleCreateSnapshotOpen(false)}
            />
          </Margin>
        )}
      </ReduxForm>
    ) : null;

  const _footer =
    !loading && selected.length > 0 ? (
      <SnapshotsListActions
        submitting={submitting}
        allowedActions={allowedActions}
        statuses={statuses}
        onStart={() => handleStart(selected)}
        onRemove={() => handleRemove(selected)}
      />
    ) : null;

  const _mutationError = mutationError ? (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>{mutationError}</MessageDescription>
    </Message>
  ) : null;

  const _items = !_loading ? (
    <ReduxForm form={TABLE_FORM_NAME}>
      {props => (
        <SnapshotsList
          snapshots={_values}
          onStart={snapshot => handleStart([snapshot])}
          onRemove={snapshot => handleRemove([snapshot])}
          selected={selected}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortBy={handleSortBy}
          toggleSelectAll={toggleSelectAll}
          allSelected={_values.length && selected.length === _values.length}
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
            searchLabel="Filter Snapshots"
            searchPlaceholder="Search for name, created...."
            searchable={!_loading}
            actionLabel="Create Snapshot"
            actionable={!createSnapshotOpen}
            onActionClick={() => toggleCreateSnapshotOpen(true)}
          />
        )}
      </ReduxForm>
      {_loading}
      {_error}
      {_mutationError}
      {_createSnapshot}
      {_items}
      {_footer}
    </ViewContainer>
  );
};

export default compose(
  graphql(StartSnapshot, { name: 'start' }),
  graphql(RemoveSnapshot, { name: 'remove' }),
  graphql(CreateSnapshotMutation, { name: 'createSnapshot' }),
  graphql(GetSnapshots, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, refetch, ...rest } }) => {
      const { name } = variables;
      const instance = find(get(rest, 'machines', []), ['name', name]);

      const snapshots = get(instance, 'snapshots', []);

      const index = GenIndex(
        snapshots.map(({ name, ...rest }) => ({ ...rest, id: name }))
      );

      return {
        index,
        snapshots,
        instance,
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ form, values }, { index, snapshots = [], ...rest }) => {
      const tableValues = get(form, `${TABLE_FORM_NAME}.values`) || {};
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);

      // check whether the table form has an error
      const tableMutationError = get(form, `${TABLE_FORM_NAME}.error`, null);
      // check whether the create form has an error
      const createMutationError = get(form, `${CREATE_FORM_NAME}.error`, null);
      // check whether the main form is submitting
      const submitting = get(form, `${TABLE_FORM_NAME}.submitting`, false);

      const selected = Object.keys(tableValues)
        .filter(key => Boolean(tableValues[key]))
        .map(name => find(snapshots, ['name', name]))
        .filter(Boolean);

      const sortBy = get(values, 'snapshots-list-sort-by', 'name');
      const sortOrder = get(values, 'snapshots-list-sort-order', 'asc');
      const createSnapshotOpen = get(values, 'snapshots-create-open', false);

      // if user is searching something, get items that match that query
      const filtered = filter
        ? index.search(filter).map(({ ref }) => find(snapshots, ['name', ref]))
        : snapshots;

      // from filtered instances, sort asc
      // set's mutating flag
      const ascSorted = sort(filtered, [sortBy]).map(({ id, ...item }) => ({
        ...item,
        id,
        mutating: get(values, `${id}-mutating`, false)
      }));

      const allowedActions = {
        start: selected.length === 1,
        remove: true
      };

      // get mutating statuses
      const statuses = {
        starting: get(values, 'snapshot-list-starting', false),
        removing: get(values, 'snapshot-list-removeing', false)
      };

      return {
        ...rest,
        snapshots: sortOrder === 'asc' ? ascSorted : ascSorted.reverse(),
        selected,
        sortBy,
        sortOrder,
        submitting,
        mutationError: tableMutationError || createMutationError,
        allowedActions,
        statuses,
        createSnapshotOpen
      };
    },
    (dispatch, ownProps) => {
      const { instance, createSnapshot, refetch } = ownProps;

      return {
        handleSortBy: (newSortBy, sortOrder) => {
          dispatch([
            set({
              name: `snapshots-list-sort-order`,
              value: sortOrder === 'desc' ? 'asc' : 'desc'
            }),
            set({
              name: `snapshots-list-sort-by`,
              value: newSortBy
            })
          ]);
        },
        toggleCreateSnapshotOpen: value =>
          dispatch(
            set({
              name: `snapshots-create-open`,
              value
            })
          ),
        toggleSelectAll: ({ selected = [], snapshots = [] }) => () => {
          const same = selected.length === snapshots.length;
          const hasSelected = selected.length > 0;

          // none are selected, toggle to all
          if (!hasSelected) {
            return dispatch(
              snapshots.map(({ name }) => change(TABLE_FORM_NAME, name, true))
            );
          }

          // all are selected, toggle to none
          if (hasSelected && same) {
            return dispatch(
              snapshots.map(({ name }) => change(TABLE_FORM_NAME, name, false))
            );
          }

          // some are selected, toggle to all
          if (hasSelected && !same) {
            return dispatch(
              snapshots.map(({ name }) => change(TABLE_FORM_NAME, name, true))
            );
          }
        },

        handleCreateSnapshot: async ({ name }) => {
          const [err] = await intercept(
            createSnapshot({
              variables: { name, id: instance.id }
            })
          );

          if (err) {
            return dispatch(
              stopSubmit(TABLE_FORM_NAME, {
                _error: parseError(err)
              })
            );
          }

          dispatch(
            set({
              name: `snapshots-create-open`,
              value: false
            })
          );
        },

        handleAction: async ({ name, selected = [] }) => {
          const action = ownProps[name];
          const gerund = `${name}ing`;

          // flips submitting flag to true so that we can disable everything
          const flipSubmitTrue = startSubmit(TABLE_FORM_NAME);

          // sets (starting/rebooting/etc) to true so that we can, for instance,
          // have a spinner on the correct button
          const setIngTrue = set({
            name: `snapshot-list-${gerund}`,
            value: true
          });

          // sets the individual item mutation flags so that we can show a
          // spinner in the row
          const setMutatingTrue = selected.map(({ id }) =>
            set({ name: `${id}-mutating`, value: true })
          );

          // wait for everything to finish and catch the error
          const [err] = await intercept(
            Promise.resolve(
              dispatch([flipSubmitTrue, setIngTrue, ...setMutatingTrue])
            ).then(() => {
              // starts all the mutations for all the selected items
              return Promise.all(
                selected.map(({ name }) =>
                  action({ variables: { id: instance.id, snapshot: name } })
                )
              );
            })
          );

          // reverts submitting flag to false and propagates the error if it exists
          const flipSubmitFalse = stopSubmit(TABLE_FORM_NAME, {
            _error: err && parseError(err)
          });

          // if no error, clears selected
          const clearSelected = !err && reset(TABLE_FORM_NAME);

          // reverts (starting/rebooting/etc) to false
          const setIngFalse = set({
            name: `snapshot-list-${gerund}`,
            value: false
          });

          // reverts the individual item mutation flags
          // when action === remove, let it stay spinning
          const setMutatingFalse =
            name !== 'remove' &&
            selected.map(({ id }) =>
              set({ name: `${id}-mutating`, value: false })
            );

          const actions = [
            flipSubmitFalse,
            clearSelected,
            setIngFalse,
            ...setMutatingFalse
          ].filter(Boolean);

          // refetch list - even though we poll anyway - after clearing everything
          return Promise.resolve(dispatch(actions)).then(() => refetch());
        }
      };
    },
    (stateProps, dispatchProps, ownProps) => {
      const { selected, snapshots } = stateProps;
      const { toggleSelectAll } = dispatchProps;

      return {
        ...ownProps,
        ...stateProps,
        selected,
        snapshots,
        ...dispatchProps,
        toggleSelectAll: toggleSelectAll({ selected, snapshots })
      };
    }
  )
)(Snapshots);
