import React from 'react';
import { compose, graphql } from 'react-apollo';
import get from 'lodash.get';
import forceArray from 'force-array';

import ManifestQuery from '@graphql/Manifest.gql';
import DeploymentGroupBySlugQuery from '@graphql/DeploymentGroupBySlug.gql';

import ManifestEditOrCreate from '@containers/manifest/edit-or-create';
import { Progress } from '@components/manifest/edit-or-create';
import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { Loader, ErrorMessage, WarningMessage } from '@components/messaging';

const Manifest = ({
  loading,
  error,
  manifest = '',
  environment = '',
  files = [],
  deploymentGroup = null,
  hasManifest = false,
  match
}) => {
  const stage = match.params.stage;
  const _title = <Title>Edit Manifest</Title>;

  if (loading || !deploymentGroup || !hasManifest) {
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
          message="An error occurred while loading your deployment group."
        />
      </LayoutContainer>
    );
  }

  const _notice =
    deploymentGroup && deploymentGroup.imported && !manifest ? (
      <WarningMessage
        title="Be aware"
        message="Since this Deployment Group was imported, it doesn&#x27;t have the initial manifest."
      />
    ) : null;

  return (
    <LayoutContainer>
      {_title}
      <Progress stage={stage} edit />
      {_notice}
      <ManifestEditOrCreate
        manifest={manifest}
        environment={environment}
        files={files}
        deploymentGroup={deploymentGroup}
        edit
      />
    </LayoutContainer>
  );
};

export default compose(
  graphql(ManifestQuery, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    }),
    props: ({ data: { deploymentGroup, loading, error } }) => ({
      files: get(deploymentGroup, 'version.manifest.files', []),
      manifest: get(deploymentGroup, 'version.manifest.raw', ''),
      environment: get(deploymentGroup, 'version.manifest.environment', ''),
      hasManifest: Boolean(get(deploymentGroup, 'version.manifest')),
      loading,
      error
    })
  }),
  graphql(DeploymentGroupBySlugQuery, {
    options: props => ({
      variables: {
        slug: props.match.params.deploymentGroup
      }
    }),
    props: ({
      data: { deploymentGroups, loading, error, startPolling, stopPolling }
    }) => {
      const dgs = forceArray(deploymentGroups);

      if (!dgs.length) {
        startPolling(1000);
      } else {
        stopPolling();
      }

      return {
        deploymentGroup: dgs[0],
        loading,
        error
      };
    }
  })
)(Manifest);
