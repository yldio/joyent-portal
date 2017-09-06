import React from 'react';
import { graphql } from 'react-apollo';
import get from 'lodash.get';

import ManifestEditOrCreate from '@containers/manifest/edit-or-create';
import { Progress } from '@components/manifest';
import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import PortalQuery from '@graphql/Portal.gql';

const DeploymentGroupCreate = ({ match, dataCenter }) => (
  <LayoutContainer>
    <Title>Creating deployment group</Title>
    <Progress stage={match.params.stage} create />
    <ManifestEditOrCreate create dataCenter={dataCenter} />
  </LayoutContainer>
);

const DeploymentGroupCreateWithData = graphql(PortalQuery, {
  props: ({ data: { portal = {} } }) => ({
    dataCenter: get(portal, 'datacenter.region', '')
  })
})(DeploymentGroupCreate);

export default DeploymentGroupCreateWithData;