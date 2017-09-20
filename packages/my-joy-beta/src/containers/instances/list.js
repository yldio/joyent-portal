import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import forceArray from 'force-array';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import InstancesQuery from '@graphql/instances.gql';
import { Item as InstanceItem } from '@components/instances';

const InstanceList = ({ instances, loading, error }) => {
  const _title = <Title>Instances</Title>;

  const _loading = !(loading && !forceArray(instances).length) ? null : (
    <StatusLoader />
  );

  const _error = !error ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instances."
      error
    />
  );

  const _instances = forceArray(instances).map(instance => (
    <InstanceItem key={instance.id} {...instance} />
  ));

  return (
    <ViewContainer center={Boolean(_loading)}>
      {_title}
      {!_loading && _error}
      {_loading}
      {_instances}
    </ViewContainer>
  );
};

InstanceList.propTypes = {
  loading: PropTypes.bool,
  instances: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

export default compose(
  graphql(InstancesQuery, {
    options: () => ({
      pollInterval: 1000
    }),
    props: ({ data: { machines, loading, error } }) => ({
      instances: forceArray(machines),
      loading,
      error
    })
  })
)(InstanceList);
