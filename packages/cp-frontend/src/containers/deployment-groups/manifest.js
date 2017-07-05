import React from 'react';
import { compose, graphql } from 'react-apollo';
import get from 'lodash.get';

import ManifestQuery from '@graphql/Manifest.gql';
import DeploymentGroupBySlugQuery from '@graphql/DeploymentGroupBySlug.gql';

import DeploymentGroupEditOrCreate from './edit-or-create';
import { Progress } from '@components/deployment-groups/create';
import { LayoutContainer } from '@components/layout';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import { H2 } from 'joyent-ui-toolkit';

const Manifest = ({
  loading,
  error,
  manifest = '',
  deploymentGroup = null,
  match
}) => {
  const stage = match.params.stage;
  const _loading = !loading ? null : <DeploymentGroupsLoading />;
  const _error = !error ? null : <span>{error.toString()}</span>;

  const _view = loading || !deploymentGroup
    ? null
    : <DeploymentGroupEditOrCreate
        edit
        manifest={manifest}
        deploymentGroup={deploymentGroup}
      />;

  const _notice = !error &&
    !loading &&
    deploymentGroup &&
    deploymentGroup.imported &&
    !manifest
    ? <span>
        Since this DeploymentGroup was imported, it doesn't have the initial
        manifest
      </span>
    : null;

  return (
    <LayoutContainer>
      <H2>Edit Manifest</H2>
      <Progress stage={stage} edit />
      {_error}
      {_loading}
      {_notice}
      {_view}
    </LayoutContainer>
  );
};

export default compose(
  graphql(ManifestQuery, {
    options: props => ({
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    }),
    props: ({ data: { deploymentGroup, loading, error } }) => ({
      manifest: get(deploymentGroup, 'version.manifest.raw', ''),
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
    props: ({ data: { deploymentGroups, loading, error } }) => ({
      deploymentGroup: deploymentGroups && deploymentGroups.length
        ? deploymentGroups[0]
        : null,
      loading,
      error
    })
  })
)(Manifest);
