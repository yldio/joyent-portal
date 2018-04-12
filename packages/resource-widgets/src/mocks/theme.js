import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  theme,
  RootContainer,
  PageContainer,
  ViewContainer
} from 'joyent-ui-toolkit';

export default ({ children, ss }) => (
  <ThemeProvider theme={theme}>
    {ss ? (
      <RootContainer>
        <PageContainer>
          <ViewContainer>{children}</ViewContainer>
        </PageContainer>
      </RootContainer>
    ) : (
      children
    )}
  </ThemeProvider>
);
