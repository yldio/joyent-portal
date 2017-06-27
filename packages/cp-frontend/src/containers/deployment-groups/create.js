import React from 'react';

import DeploymentGroupEditOrCreate from './edit-or-create';
import { Progress } from '@components/deployment-groups/create';
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
      <DeploymentGroupEditOrCreate
        create
        manifest={manifest}
        deploymentGroup={deploymentGroup}
      />
    </LayoutContainer>
  );
};
