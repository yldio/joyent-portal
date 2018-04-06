import React from 'react';
import { Margin } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';

import { ViewContainer } from 'joyent-ui-toolkit';

import { Toolbar } from '@components/toolbar';
import ServiceGroupsList, { Item as ServiceGroupsItem } from '@components/list';
import ListServiceGroups from '@graphql/list-service-groups.gql';

const ServiceGroups = ({ groups = [] }) => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom={3}>
        <Toolbar
          searchLabel="Filter service groups"
          actionLabel="Create Service Group"
          actionTo="/service-groups/~create"
        />
      </Margin>
      <ServiceGroupsList>
        {groups.map(({ id, ...sg }) => (
          <ServiceGroupsItem key={id} id={id} {...sg} />
        ))}
      </ServiceGroupsList>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(ListServiceGroups, {
    options: ({ location }) => ({
      ssr: false,
      pollInterval: 1000
    }),
    props: ({ data }) => data
  })
)(ServiceGroups);
