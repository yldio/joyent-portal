import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { theme, RootContainer } from 'joyent-ui-toolkit';

import { client, store } from '@state/store';
import Router from '@root/router';
import remcalc from 'remcalc';

const { NODE_ENV } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

const fullTheme = {
  ...theme,
  font: {
    ...theme.font,
    href: !IS_PRODUCTION
      ? theme.font.href
      : () =>
          'https://fonts.googleapis.com/css?family=Libre+Franklin:400,500,600'
  },
  flexboxgrid: {
    gridSize: 12, // rem
    gutterWidth: 1.25, // rem
    outerMargin: 1.875, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 56, // rem
      lg: 59 // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75 // em
    }
  },
  spacing: {
    0.5: remcalc(4),
    0: remcalc(0),
    1: remcalc(6),
    2: remcalc(12),
    3: remcalc(18),
    4: remcalc(24),
    5: remcalc(30),
    6: remcalc(36),
    7: remcalc(42),
    8: remcalc(48),
    9: remcalc(54),
    10: remcalc(60)
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
