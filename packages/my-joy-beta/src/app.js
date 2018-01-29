import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { theme, RootContainer } from 'joyent-ui-toolkit';

import { client, store } from '@state/store';
import Router from '@root/router';

const { NODE_ENV } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

const fullTheme = {
  ...theme,
  font: {
    ...theme.font,
    href: !IS_PRODUCTION
      ? theme.font.href
      : () =>
          'https://fonts.googleapis.com/css?family=Libre+Franklin:400,500,600,700'
  }
};

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={fullTheme}>
      <ReduxProvider store={store}>
        <RootContainer>
          <Router />
        </RootContainer>
      </ReduxProvider>
    </ThemeProvider>
  </ApolloProvider>
);
