import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'emotion-theming';

import theme from 'joyent-ui-toolkit/dist/es/theme';

import { client } from './state';
import Header from './header';

const fullTheme = {
  ...theme,
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
  }
};

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={fullTheme}>
      <Header />
    </ThemeProvider>
  </ApolloProvider>
);
