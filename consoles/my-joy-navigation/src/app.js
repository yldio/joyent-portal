import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'emotion-theming';

import theme from '@state/theme';

import { client } from './state';
import Header from './header';

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  </ApolloProvider>
);
