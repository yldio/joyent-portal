import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import get from 'lodash.get';

import ManifestQuery from '@graphql/Manifest.gql';

import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { Loader, ErrorMessage, WarningMessage } from '@components/messaging';
import { Environment } from '@components/manifest/edit-or-create';

const EnvironmentReadOnly = ({
  files = [],
  environment = '',
  loading,
  error
}) => {
  const _title = <Title>Environment</Title>;

  if (loading && !environment.length && !files.length) {
    return (
      <LayoutContainer center>
        {_title}
        <Loader />
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        {_title}
        <ErrorMessage
          title="Ooops!"
          message="An error occurred while loading environment data."
        />
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      {_title}
      <Environment defaultValue={environment} files={files} readOnly />
    </LayoutContainer>
  );
};

export default compose(
  graphql(ManifestQuery, {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    }),
    props: ({ data: { deploymentGroup, loading, error } }) => ({
      files: get(deploymentGroup, 'version.manifest.files', []),
      environment: get(deploymentGroup, 'version.manifest.environment', ''),
      loading,
      error
    })
  })
)(EnvironmentReadOnly);
