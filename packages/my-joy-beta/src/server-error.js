import React from 'react';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import {
  RootContainer,
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle,
  Divider
} from 'joyent-ui-toolkit';

import Breadcrumb from '@containers/navigation/breadcrumb';

export const Route = () => (
  <ViewContainer main>
    <Divider height={remcalc(24)} transparent />
    <Margin bottom={4}>
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
