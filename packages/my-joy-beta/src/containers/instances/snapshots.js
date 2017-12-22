import React from 'react';
import moment from 'moment';
import forceArray from 'force-array';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';

import { reduxForm, stopSubmit, startSubmit, change } from 'redux-form';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import GetSnapshots from '@graphql/list-snapshots.gql';
import StartSnapshot from '@graphql/start-from-snapshot.gql';
import RemoveSnapshot from '@graphql/remove-snapshot.gql';
import { Snapshots as SnapshotsList } from '@components/instances';
import GenIndex from '@state/gen-index';

const SnapshotsListForm = reduxForm({
  form: `snapshots-list`,
  initialValues: {
    sort: 'name'
  }
})(SnapshotsList);

const Snapshots = ({
  snapshots = [],
  selected = [],
  loading,
  error,
  handleAction
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
      <SnapshotsListForm
        snapshots={_values}
        loading={_loading}
        onAction={handleAction}
        selected={selected}
      />
    </ViewContainer>
  );
};

export default compose(
  graphql(StartSnapshot, { name: 'start' }),
  graphql(RemoveSnapshot, { name: 'remove' }),
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
        error
      };
    }
  }),
  connect(
    (state, { index, snapshots = [], ...rest }) => {
      const form = get(state, 'form.snapshots-list.values', {});
      const filter = get(form, 'filter');
      const sort = get(form, 'sort');

      const values = filter
        ? index.search(filter).map(({ ref }) => find(snapshots, ['name', ref]))
        : snapshots;

      const selected = Object.keys(form)
        .filter(key => Boolean(form[key]))
        .map(name => find(values, ['name', name]))
        .filter(Boolean)
        .map(({ name }) => find(snapshots, ['name', name]))
        .filter(Boolean);

      return {
        ...rest,
        snapshots: sortBy(values, value => get(value, sort)),
        selected
      };
    },
    (dispatch, { create, start, remove, instance, history, match }) => ({
      handleAction: ({ name, items = [] }) => {
        const form = 'snapshots-list';

        const types = {
          start: () =>
            Promise.resolve(dispatch(startSubmit(form))).then(() =>
              Promise.all(
                items.map(({ name }) =>
                  start({ variables: { id: instance.id, snapshot: name } })
                )
              )
            ),
          delete: () =>
            Promise.resolve(dispatch(startSubmit(form))).then(() =>
              Promise.all(
                items.map(({ name }) =>
                  remove({ variables: { id: instance.id, snapshot: name } })
                )
              )
            ),
          create: () =>
            Promise.resolve(
              history.push(`/instances/${instance.name}/snapshots/~create`)
            )
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
