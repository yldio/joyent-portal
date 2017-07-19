import React from 'react';

import ManifestEditOrCreate from '@containers/manifest/edit-or-create';
import { Progress } from '@components/manifest/edit-or-create';
import { LayoutContainer } from '@components/layout';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import { H2 } from 'joyent-ui-toolkit';

export default ({
  loading,
  error,
  manifest = '',
  deploymentGroup = null,
  match
}) => {
  const stage = match.params.stage;

  return (
    <LayoutContainer>
      <H2>Creating deployment group</H2>
      {loading && <DeploymentGroupsLoading />}
      {error && <span>{error.toString()}</span>}
      <Progress stage={stage} create />
      <ManifestEditOrCreate
        create
        manifest={manifest}
        deploymentGroup={deploymentGroup}
      />
    </LayoutContainer>
  );
};
