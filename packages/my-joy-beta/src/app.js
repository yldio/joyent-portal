import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import { theme, RootContainer } from 'joyent-ui-toolkit';

import { client, store } from '@state/store';
import Router from '@root/router';

export default () => (
  <ApolloProvider client={client} store={store}>
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Router />
      </RootContainer>
    </ThemeProvider>
  </ApolloProvider>
);
