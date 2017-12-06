import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { stopSubmit, startSubmit, reset, change } from 'redux-form';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import forceArray from 'force-array';
import get from 'lodash.get';
import intercept from 'apr-intercept';
import find from 'lodash.find';
import sort from 'lodash.sortby';
import remcalc from 'remcalc';

import {
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle,
  StatusLoader,
  Divider
} from 'joyent-ui-toolkit';

import ListInstances from '@graphql/list-instances.gql';
import StopInstance from '@graphql/stop-instance.gql';
import StartInstance from '@graphql/start-instance.gql';
import RebootInstance from '@graphql/reboot-instance.gql';
import ResizeInstance from '@graphql/resize-instance.gql';
import EnableInstanceFw from '@graphql/enable-instance-fw.gql';
import DisableInstanceFw from '@graphql/disable-instance-fw.gql';
import CreateSnapshot from '@graphql/create-snapshot.gql';
import StartSnapshot from '@graphql/start-from-snapshot.gql';
import Index from '@state/gen-index';
import parseError from '@state/parse-error';

import {
  default as InstanceList,
  MenuForm as InstanceListMenuForm
} from '@components/instances/list';

const TABLE_FORM_NAME = 'instance-list-table';
const MENU_FORM_NAME = 'instance-list-menu';

const List = ({
  instances = [],
  selected = [],
  allowedActions,
  sortBy = 'name',
  sortOrder = 'desc',
  loading = false,
  error = null,
  handleAction,
  toggleSelectAll,
  handleSortBy
}) => {
  const _instances = forceArray(instances);

  const _loading =
    loading && !_instances.length
      ? [
          <Divider key="divider" height={remcalc(30)} transparent />,
          <StatusLoader key="spinner" />
        ]
      : null;

  const _error =
    error && !_instances.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instances
        </MessageDescription>
      </Message>
    ) : null;

  const _table = !loading ? (
    <ReduxForm
      form={TABLE_FORM_NAME}
      items={_instances}
      actionable={selected.length}
      allowedActions={allowedActions}
      allSelected={instances.length && selected.length === instances.length}
      sortBy={sortBy}
      sortOrder={sortOrder}
      toggleSelectAll={toggleSelectAll}
      onSortBy={handleSortBy}
      onStart={({ id } = {}) =>
        handleAction({ name: 'start', selected: id ? [{ id }] : selected })
      }
      onStop={({ id } = {}) =>
        handleAction({ name: 'stop', selected: id ? [{ id }] : selected })
      }
      onReboot={({ id } = {}) =>
        handleAction({ name: 'restart', selected: id ? [{ id }] : selected })
      }
      onDelete={({ id } = {}) =>
        handleAction({ name: 'delete', selected: id ? [{ id }] : selected })
      }
    >
      {InstanceList}
    </ReduxForm>
  ) : null;

  return (
    <ViewContainer main>
      <Divider height={remcalc(30)} transparent />
      <ReduxForm form={MENU_FORM_NAME} searchable={!_loading}>
        {InstanceListMenuForm}
      </ReduxForm>
      {_error}
      {_loading}
      {_table}
    </ViewContainer>
  );
};

export default compose(
  graphql(StopInstance, { name: 'stop' }),
  graphql(StartInstance, { name: 'start' }),
  graphql(RebootInstance, { name: 'reboot' }),
  graphql(ResizeInstance, { name: 'resize' }),
  graphql(EnableInstanceFw, { name: 'enableFw' }),
  graphql(DisableInstanceFw, { name: 'disableFw' }),
  graphql(CreateSnapshot, { name: 'createSnapshot' }),
  graphql(StartSnapshot, { name: 'startSnapshot' }),
  graphql(ListInstances, {
    options: () => ({
      pollInterval: 1000
    }),
    props: ({ data: { machines, loading, error, refetch } }) => {
      const instances = forceArray(machines).map(({ state, ...machine }) => ({
        ...machine,
        state,
        allowedActions: {
          start: state !== 'RUNNING',
          stop: state === 'RUNNING'
        }
      }));

      return {
        instances,
        loading,
        error,
        index: Index(instances),
        refetch
      };
    }
  }),
  connect(
    ({ form, values }, { index, instances = [] }) => {
      // get search value
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);
      // check checked items ids
      const checked = get(form, `${TABLE_FORM_NAME}.values`, {});
      // get sort values
      const sortBy = get(values, 'instance-list-sort-by', 'name');
      const sortOrder = get(values, 'instance-list-sort-order', 'asc');

      // if user is searching something, get items that match that query
      const filtered = filter
        ? index.search(filter).map(({ ref }) => find(instances, ['id', ref]))
        : instances;

      // from filtered instances, sort asc
      const ascSorted = sort(filtered, [sortBy]);

      // if "select-all" is checked, all the instances are selected
      // otherwise, map through the checked ids and get the instance value
      const selected = Object.keys(checked)
        .filter(id => Boolean(checked[id]))
        .map(id => find(ascSorted, ['id', id]))
        .filter(Boolean);

      const allowedActions = {
        start: selected.some(({ state }) => state !== 'RUNNING'),
        stop: selected.some(({ state }) => state === 'RUNNING')
      };

      return {
        // is sortOrder !== asc, reverse order
        instances: sortOrder === 'asc' ? ascSorted : ascSorted.reverse(),
        allowedActions,
        selected,
        index,
        sortOrder,
        sortBy
      };
    },
    (dispatch, { refetch, ...ownProps }) => ({
      handleSortBy: ({ sortBy: currentSortBy, sortOrder }) => newSortBy => {
        // sort prop is the same, toggle
        if (currentSortBy === newSortBy) {
          return dispatch(
            set({
              name: `instance-list-sort-order`,
              value: sortOrder === 'desc' ? 'asc' : 'desc'
            })
          );
        }

        dispatch([
          set({
            name: `instance-list-sort-order`,
            value: 'desc'
          }),
          set({
            name: `instance-list-sort-by`,
            value: newSortBy
          })
        ]);
      },
      toggleSelectAll: ({ selected = [], instances = [] }) => () => {
        const same = selected.length === instances.length;
        const hasSelected = selected.length > 0;

        // none are selected, toggle to all
        if (!hasSelected) {
          return dispatch(
            instances.map(({ id }) => change(TABLE_FORM_NAME, id, true))
          );
        }

        // all are selected, toggle to none
        if (hasSelected && same) {
          return dispatch(
            instances.map(({ id }) => change(TABLE_FORM_NAME, id, false))
          );
        }

        // some are selected, toggle to all
        if (hasSelected && !same) {
          return dispatch(
            instances.map(({ id }) => change(TABLE_FORM_NAME, id, true))
          );
        }
      },
      handleAction: async ({ selected, name }) => {
        const action = ownProps[name];
        const gerund = `${name}ing`;

        // flips submitting flag to true so that we can disable everything
        const flipSubmitTrue = startSubmit(TABLE_FORM_NAME);

        // sets (starting/restarting/etc) to true so that we can, for instance,
        // have a spinner on the correct button
        const setIngTrue = set({
          name: `instance-list-${gerund}`,
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
              selected.map(({ id }) => action({ variables: { id } }))
            );
          })
        );

        // reverts submitting flag to false and propagates the error if it exists
        const flipSubmitFalse = stopSubmit(TABLE_FORM_NAME, {
          _error: err && parseError(err)
        });

        // if no error, clears selected
        const clearSelected = !err && reset(TABLE_FORM_NAME);

        // reverts (starting/restarting/etc) to false
        const setIngFalse = set({
          name: `instance-list-${gerund}`,
          value: false
        });

        // reverts the individual item mutation flags
        const setMutatingFalse = selected.map(({ id }) =>
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
    }),
    (stateProps, dispatchProps, ownProps) => {
      const { selected, instances, sortBy, sortOrder } = stateProps;
      const { toggleSelectAll, handleSortBy } = dispatchProps;

      return {
        ...ownProps,
        ...stateProps,
        selected,
        instances,
        ...dispatchProps,
        toggleSelectAll: toggleSelectAll({ selected, instances }),
        handleSortBy: handleSortBy({ sortBy, sortOrder })
      };
    }
  )
)(List);
