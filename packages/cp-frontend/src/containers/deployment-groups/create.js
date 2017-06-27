import React from 'react';

import DeploymentGroupEditOrCreate from './edit-or-create';
import { LayoutContainer } from '@components/layout';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import { H2 } from 'joyent-ui-toolkit';

export default ({ loading, error, manifest = '', deploymentGroup = null }) =>
  <LayoutContainer>
    <H2>Creating deployment group</H2>
    {loading && <DeploymentGroupsLoading />}
    {error && <span>{error.toString()}</span>}
    <DeploymentGroupEditOrCreate
      create
      manifest={manifest}
      deploymentGroup={deploymentGroup}
    />
  </LayoutContainer>;
