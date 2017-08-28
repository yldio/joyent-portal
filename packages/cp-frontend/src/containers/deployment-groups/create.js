import React from 'react';

import ManifestEditOrCreate from '@containers/manifest/edit-or-create';
import { Progress } from '@components/manifest/edit-or-create';
import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';

export default ({ match }) => (
  <LayoutContainer>
    <Title>Creating deployment group</Title>
    <Progress stage={match.params.stage} create />
    <ManifestEditOrCreate create />
  </LayoutContainer>
);
