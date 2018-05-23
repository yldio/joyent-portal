import React from 'react';
import { Margin } from 'styled-components-spacing';

import {
  RootContainer,
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import Breadcrumb from '@containers/breadcrumb';

export const Route = () => (
  <ViewContainer main>
    <Margin bottom="4">
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your page
        </MessageDescription>
      </Message>
    </Margin>
  </ViewContainer>
);

export default () => (
  <RootContainer>
    <PageContainer>
      <Breadcrumb />
      <Route />
    </PageContainer>
  </RootContainer>
);
