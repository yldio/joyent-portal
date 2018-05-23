import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import isFunction from 'lodash.isfunction';
import isFinite from 'lodash.isfinite';

import theme from '@state/theme';
import createStore from '@state/redux-store';
import createClient from '@state/apollo-client';
import App from './app';

if (!isFunction(Number.isFinite)) {
  Number.isFinite = isFinite;
}

ReactDOM.hydrate(
  <ApolloProvider client={createClient()}>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={createStore()}>
        <BrowserRouter>
          <HelmetProvider context={{}}>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
