import React from 'react';
import moment from 'moment';
import forceArray from 'force-array';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';
import sort from 'lodash.sortby';
import { set } from 'react-redux-values';
import remcalc from 'remcalc';
import ReduxForm from 'declarative-redux-form';
import { withRouter } from 'react-router-dom';

import {
  reduxForm,
  stopSubmit,
  SubmissionError,
  startSubmit,
  change
} from 'redux-form';

import {
  Divider,
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import GetSnapshots from '@graphql/list-snapshots.gql';
import StartSnapshot from '@graphql/start-from-snapshot.gql';
import RemoveSnapshot from '@graphql/remove-snapshot.gql';
import CreateSnapshotMutation from '@graphql/create-snapshot.gql';
import { Snapshots as SnapshotsList } from '@components/instances';
import GenIndex from '@state/gen-index';
import ToolbarForm from '@components/instances/toolbar';

const MENU_FORM_NAME = 'snapshot-list-menu';
const TABLE_FORM_NAME = 'snapshot-list-table';

const SnapshotsListForm = reduxForm({
  form: TABLE_FORM_NAME,
  initialValues: {
    'snapshots-list-sort-by': 'name',
    'snapshots-list-sort-order': 'asc',
    'snapshots-show-create-instance': false
  }
})(SnapshotsList);

const Snapshots = ({
  snapshots = [],
  selected = [],
  loading,
  error,
  handleAction,
  sortOrder,
  handleSortBy,
  sortBy,
  history,
  toggleSelectAll,
  toggleCreateSnapshot,
  showCreateSnapshot,
  hideCreateSnapshot,
  createSnapshot,
  machineID,
  match: { params }
}) => {
  const _values = forceArray(snapshots);
  const _loading = !_values.length && loading;

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

  return (
    <ViewContainer main>
      {_error}
      <Divider height={remcalc(30)} transparent />
      <ReduxForm form={MENU_FORM_NAME}>
        {props => (
          <ToolbarForm
            {...props}
            searchLabel="Filter Snapshots"
            searchPlaceholder="Search for name, created...."
            searchable={!_loading}
            actionLabel="Create Snapshot"
            actionable={showCreateSnapshot !== true}
            onActionClick={toggleCreateSnapshot}
          />
        )}
      </ReduxForm>
      <ReduxForm form={TABLE_FORM_NAME}>
        {props => (
          <SnapshotsListForm
            showCreateSnapshot={showCreateSnapshot}
            machineID={machineID}
            hideCreateSnapshot={hideCreateSnapshot}
            snapshots={_values}
            loading={_loading}
            onAction={handleAction}
            selected={selected}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortBy={handleSortBy}
            toggleSelectAll={toggleSelectAll}
            allSelected={_values.length && selected.length === _values.length}
          />
        )}
      </ReduxForm>
    </ViewContainer>
  );
};

export default compose(
  withRouter,
  graphql(StartSnapshot, { name: 'start' }),
  graphql(RemoveSnapshot, { name: 'remove' }),
  graphql(CreateSnapshotMutation, { name: 'createSnapshotMutation' }),
  graphql(GetSnapshots, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const { name } = variables;
      const instance = find(get(rest, 'machines', []), ['name', name]);
      const snapshots = get(
        instance,
        'snapshots',
        []
      ).map(({ created, updated, ...rest }) => ({
        ...rest,
        machineID: get(instance, 'id'),
        created: moment.utc(created).unix(),
        updated: moment.utc(updated).unix()
      }));

      const index = GenIndex(
        snapshots.map(({ name, ...rest }) => ({ ...rest, id: name }))
      );

      return {
        index,
        snapshots,
        instance,
        loading,
        error,
        machineID: get(instance, 'id')
      };
    }
  }),
  connect(
    ({ form, values }, { index, snapshots = [], ...rest }) => {
      const tableValues = get(form, `${TABLE_FORM_NAME}.values`) || {};
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);

      const selected = Object.keys(tableValues)
        .filter(key => Boolean(tableValues[key]))
        .map(name => find(snapshots, ['name', name]))
        .filter(Boolean);

      const sortBy = get(values, 'snapshots-list-sort-by', 'name');
      const sortOrder = get(values, 'snapshots-list-sort-order', 'asc');

      const showCreateSnapshot = get(
        values,
        'snapshots-show-create-instance',
        'false'
      );

      // if user is searching something, get items that match that query
      const filtered = filter
        ? snapshots.filter(
            snapshot =>
              snapshot.name.includes(filter.toLowerCase()) ||
              snapshot.created.toString().includes(filter.toLowerCase()) ||
              snapshot.state.toLowerCase().includes(filter.toLowerCase()) ||
              moment
                .unix(snapshot.created)
                .fromNow()
                .includes(filter.toLowerCase()) ||
              snapshot.updated.toString().includes(filter.toLowerCase()) ||
              moment
                .unix(snapshot.updated)
                .fromNow()
                .includes(filter.toLowerCase())
          )
        : snapshots;

      // from filtered instances, sort asc
      // set's mutating flag
      const ascSorted = sort(filtered, [sortBy]).map(({ id, ...item }) => ({
        ...item,
        id,
        mutating: get(values, `${id}-mutating`, false)
      }));

      return {
        ...rest,
        snapshots: sortOrder === 'asc' ? ascSorted : ascSorted.reverse(),
        selected,
        sortBy,
        sortOrder,
        showCreateSnapshot
      };
    },
    (
      dispatch,
      {
        create,
        start,
        remove,
        instance,
        history,
        match,
        createSnapshotMutation,
        ...ownProps
      }
    ) => ({
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
      toggleCreateSnapshot: () =>
        dispatch(
          set({
            name: `snapshots-show-create-instance`,
            value: true
          })
        ),
      hideCreateSnapshot: () =>
        dispatch(
          set({
            name: `snapshots-show-create-instance`,
            value: false
          })
        ),
      toggleSelectAll: (selected = [], snapshots = []) => {
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

      handleAction: ({ name, items = [] }) => {
        const form = TABLE_FORM_NAME;
        const types = {
          start: () =>
            Promise.resolve(dispatch(startSubmit(form))).then(() =>
              Promise.all(
                items.map(({ name, machineID }) =>
                  start({
                    variables: {
                      id: machineID,
                      snapshot: name
                    }
                  })
                )
              )
            ),
          delete: () =>
            Promise.resolve(dispatch(startSubmit(form))).then(() =>
              Promise.all(
                items.map(({ name, machineID }) =>
                  remove({
                    variables: {
                      id: machineID,
                      snapshot: name
                    }
                  })
                )
              )
            ),
          create: () =>
            createSnapshotMutation({
              variables: { name: items.name, id: items.id }
            })
        };

        const handleError = error => {
          dispatch(
            stopSubmit(form, {
              _error: error.graphQLErrors
                .map(({ message }) => message)
                .join('\n')
            })
          );
        };

        const handleSuccess = () => {
          dispatch(
            items
              .map(({ name: field }) => change(form, field, false))
              .concat([stopSubmit(form)])
          );
        };

        return (
          types[name] &&
          types[name]()
            .then(handleSuccess)
            .catch(handleError)
        );
      }
    })
  )
)(Snapshots);
