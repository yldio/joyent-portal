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
import RemoveInstance from '@graphql/remove-instance.gql';
import ToolbarForm from '@components/instances/toolbar';
import Index from '@state/gen-index';
import parseError from '@state/parse-error';

import {
  default as InstanceList,
  Item as InstanceListItem
} from '@components/instances/list';

import InstanceListActions from '@components/instances/footer';

const TABLE_FORM_NAME = 'instance-list-table';
const MENU_FORM_NAME = 'instance-list-menu';

export const List = ({
  instances = [],
  selected = [],
  allowedActions,
  statuses,
  sortBy = 'name',
  sortOrder = 'desc',
  loading = false,
  error = null,
  mutationError = null,
  submitting,
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

  const _mutationError = mutationError && (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>{mutationError}</MessageDescription>
    </Message>
  );

  const handleStart = selected => handleAction({ name: 'start', selected });
  const handleStop = selected => handleAction({ name: 'stop', selected });
  const handleReboot = selected => handleAction({ name: 'reboot', selected });
  const handleRemove = selected => handleAction({ name: 'remove', selected });

  const _table = !loading ? (
    <ReduxForm form={TABLE_FORM_NAME}>
      {props => (
        <InstanceList
          {...props}
          allSelected={instances.length && selected.length === instances.length}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSelectAll={toggleSelectAll}
          onSortBy={handleSortBy}
        >
          {_instances.map(({ id, ...rest }) => (
            <InstanceListItem
              key={id}
              id={id}
              {...rest}
              onStart={() => handleStart([{ id }])}
              onStop={() => handleStop([{ id }])}
              onReboot={() => handleReboot([{ id }])}
              onRemove={() => handleRemove([{ id }])}
            />
          ))}
        </InstanceList>
      )}
    </ReduxForm>
  ) : null;

  const _footer =
    !loading && selected.length ? (
      <InstanceListActions
        allowedActions={allowedActions}
        statuses={statuses}
        submitting={submitting}
        onStart={() => handleStart(selected)}
        onStop={() => handleStop(selected)}
        onReboot={() => handleReboot(selected)}
        onRemove={() => handleRemove(selected)}
      />
    ) : null;

  return (
    <ViewContainer main>
      <Divider height={remcalc(30)} transparent />
      <ReduxForm form={MENU_FORM_NAME}>
        {props => (
          <ToolbarForm
            {...props}
            searchLabel="Filter instances"
            searchPlaceholder="Search for name, state, tags, etc..."
            searchable={!_loading}
            actionLabel="Create Instance"
            actionable={false}
          />
        )}
      </ReduxForm>
      {!_mutationError ? _error : null}
      {_mutationError}
      {_loading}
      {_table}
      {_footer}
    </ViewContainer>
  );
};

export default compose(
  graphql(StopInstance, { name: 'stop' }),
  graphql(StartInstance, { name: 'start' }),
  graphql(RebootInstance, { name: 'reboot' }),
  graphql(RemoveInstance, { name: 'remove' }),
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
          stop: state === 'RUNNING',
          reboot: state === 'RUNNING',
          remove: state !== 'PROVISIONING'
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
    ({ form, values }, { index, error, instances = [] }) => {
      // get search value
      const filter = get(form, `${MENU_FORM_NAME}.values.filter`, false);
      // check checked items ids
      const checked = get(form, `${TABLE_FORM_NAME}.values`, {});
      // check whether the main form is submitting
      const submitting = get(form, `${TABLE_FORM_NAME}.submitting`, false);
      // check whether the main form has an error
      const mutationError = get(form, `${TABLE_FORM_NAME}.error`, null);
      // get sort values
      const sortBy = get(values, 'instance-list-sort-by', 'name');
      const sortOrder = get(values, 'instance-list-sort-order', 'asc');

      // if user is searching something, get items that match that query
      const filtered = filter
        ? index.search(filter).map(({ ref }) => find(instances, ['id', ref]))
        : instances;

      // from filtered instances, sort asc
      // set's mutating flag
      const ascSorted = sort(filtered, [sortBy]).map(({ id, ...item }) => ({
        ...item,
        id,
        mutating: get(values, `${id}-mutating`, false)
      }));

      // if "select-all" is checked, all the instances are selected
      // otherwise, map through the checked ids and get the instance value
      const selected = Object.keys(checked)
        .filter(id => Boolean(checked[id]))
        .map(id => find(ascSorted, ['id', id]))
        .filter(Boolean);

      const allowedActions = {
        start: selected.every(({ state }) => state === 'STOPPED'),
        stop: selected.every(({ state }) => state === 'RUNNING'),
        reboot: selected.every(({ state }) => state === 'RUNNING'),
        remove: selected.every(({ state }) => state !== 'PROVISIONING')
      };

      // get mutating statuses
      const statuses = {
        starting: get(values, 'instance-list-starting', false),
        stopping: get(values, 'instance-list-stoping', false),
        rebooting: get(values, 'instance-list-rebooting', false),
        removing: get(values, 'instance-list-removeing', false)
      };

      return {
        // is sortOrder !== asc, reverse order
        instances: sortOrder === 'asc' ? ascSorted : ascSorted.reverse(),
        allowedActions,
        selected,
        statuses,
        submitting,
        mutationError,
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

        // sets (starting/rebooting/etc) to true so that we can, for instance,
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

        // reverts (starting/rebooting/etc) to false
        const setIngFalse = set({
          name: `instance-list-${gerund}`,
          value: false
        });

        // reverts the individual item mutation flags
        const setMutatingFalse = name !== 'remove' && selected.map(({ id }) =>
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
