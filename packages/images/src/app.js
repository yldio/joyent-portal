import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { theme, RootContainer } from 'joyent-ui-toolkit';

import { client, store } from '@state/store';
import Router from '@root/router';

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <RootContainer>
          <Router />
        </RootContainer>
      </ReduxProvider>
    </ThemeProvider>
  </ApolloProvider>
);
