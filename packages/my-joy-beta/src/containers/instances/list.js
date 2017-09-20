import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import forceArray from 'force-array';
import get from 'lodash.get';
import find from 'lodash.find';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetInstances from '@graphql/list-instances.gql';
import { List as InstanceList } from '@components/instances';
import GenIndex from '@state/gen-index';

const InstanceListForm = reduxForm({
  form: `instance-list`
})(InstanceList);

const List = ({ instances, loading, error }) => {
  const _title = <Title>Instances</Title>;
  const _instances = forceArray(instances);
  const _loading = !(loading && !_instances.length) ? null : <StatusLoader />;
  const _list = _loading ? null : <InstanceListForm instances={_instances} />;

  const _error = !error ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instances."
      error
    />
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {!_loading && _error}
      {_loading}
      {_list}
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
  graphql(GetInstances, {
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
  connect((state, ownProps) => {
    const filter = get(state, 'form.instance-list.values.filter');
    const { index, instances = [], ...rest } = ownProps;

    return {
      ...rest,
      instances: !filter
        ? instances
        : index.search(filter).map(({ ref }) => find(instances, ['id', ref]))
    };
  })
)(List);
