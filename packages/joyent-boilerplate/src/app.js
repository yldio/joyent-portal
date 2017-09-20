import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, RootContainer } from 'joyent-ui-toolkit';
import { ApolloProvider } from 'react-apollo';

import { client, store } from '@state/store';
import Router from '@root/router';

export default () => (
  <RootContainer>
    <ApolloProvider client={client} store={store}>
      <ThemeProvider theme={theme}>{Router}</ThemeProvider>
    </ApolloProvider>
  </RootContainer>
);
