import React from 'react';
import { reduxForm } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import forceArray from 'force-array';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  StatusLoader,
  Title,
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import { Resize as InstanceResize } from '@components/instances';

import ListPackages from '@graphql/list-packages.gql';
import GetInstance from '@graphql/get-instance.gql';

const Resize = ({ match, loading, error, instance, packages }) => {
  const ResizeForm = reduxForm({
    form: `resize-instance-${match.params.instance}`
  })(InstanceResize);

  const _packages = forceArray(packages);

  const _title = <Title>Resize</Title>;
  const _loading = !(loading && (!_packages.length || !instance)) ? null : (
    <StatusLoader />
  );

  const _error = !(error && !_loading) ? null : (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>An error occurred</MessageDescription>
    </Message>
  );

  const _resize =
    _loading || _error ? null : (
      <ResizeForm packages={packages} instance={instance} />
    );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_resize}
    </ViewContainer>
  );
};

export default compose(
  graphql(GetInstance, {
    options: ({ match }) => ({
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      instance: find(get(rest, 'machines', []), ['name', variables.name]),
      loading,
      error
    })
  }),
  graphql(ListPackages, {
    props: ({ data: { packages, loading, error } }) => ({
      packages: forceArray(packages),
      loading,
      error
    })
  })
)(Resize);
