import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, RootContainer } from 'joyent-ui-toolkit';
import { ApolloProvider } from 'react-apollo';

import { client, store } from '@state/store';
import Router from '@root/router';
import { register } from './sw';

export default () => (
  <ApolloProvider client={client} store={store}>
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Router />
      </RootContainer>
    </ThemeProvider>
  </ApolloProvider>
);

register();
