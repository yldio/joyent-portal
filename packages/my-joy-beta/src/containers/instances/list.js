import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import forceArray from 'force-array';
import get from 'lodash.get';
import sortBy from 'lodash.sortby';
import find from 'lodash.find';

import {
  ViewContainer,
  Title,
  Message,
  MessageDescription,
  MessageTitle
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

import { List as InstanceList } from '@components/instances';
import GenIndex from '@state/gen-index';

const InstanceListForm = reduxForm({
  form: `instance-list`,
  initialValues: {
    sort: 'name'
  }
})(InstanceList);

const List = ({
  selected = [],
  instances = [],
  loading = false,
  error,
  onAction
}) => {
  const _title = <Title>Instances</Title>;
  const _instances = forceArray(instances);
  const _loading = !instances.length && loading;

  const _error =
    error && !_instances.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instances
        </MessageDescription>
      </Message>
    ) : null;

  const handleAction = name => onAction({ name, ids: selected });

  return (
    <ViewContainer main>
      {_title}
      {!_loading && _error}
      <InstanceListForm
        instances={_instances}
        loading={loading}
        onAction={handleAction}
      />
    </ViewContainer>
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  instances: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
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
    props: ({ ownProps, data: { machines, loading, error } }) => {
      const _instances = forceArray(machines);

      return {
        instances: _instances,
        loading,
        error,
        index: GenIndex(_instances)
      };
    }
  }),
  connect(
    (state, ownProps) => {
      const { index, instances = [], ...rest } = ownProps;

      const form = get(state, 'form.instance-list.values', {});
      const filter = get(form, 'filter');
      const sort = get(form, 'sort');

      const values = filter
        ? index.search(filter).map(({ ref }) => find(instances, ['id', ref]))
        : instances;

      const selected = Object.keys(form)
        .map(name => find(values, ['name', name]))
        .filter(Boolean)
        .map(({ id }) => id);

      return {
        ...rest,
        instances: sortBy(values, value => get(value, sort)),
        selected
      };
    },
    (dispatch, { instances, ...ownProps }) => ({
      onAction: ({ name, ids = [] }) => {
        const types = {
          stop: () =>
            Promise.all(ids.map(id => ownProps.stop({ variables: { id } }))),
          start: () =>
            Promise.all(ids.map(id => ownProps.start({ variables: { id } }))),
          reboot: () =>
            Promise.all(ids.map(id => ownProps.reboot({ variables: { id } }))),
          resize: () => null,
          'enable-fw': () => null,
          'disable-fw': () => null,
          'create-snap': () => null,
          'start-snap': () => null
        };

        const clearSelected = () => dispatch(ids.map(id => {
          const form = 'instance-list';
          const field = get(find(instances, ['id', id]), 'name');
          const value = false;

          if (!field) {
            return;
          }

          return change(form, field, value);
        }));

        const fn = types[name];
        return fn && fn().then(clearSelected);
      }
    })
  )
)(List);
