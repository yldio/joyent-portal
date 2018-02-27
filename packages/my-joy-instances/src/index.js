import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, consolidateStreamedStyles } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import isFunction from 'lodash.isfunction';
import isFinite from 'lodash.isfinite';

import { theme } from 'joyent-ui-toolkit';

import createStore from '@state/redux-store';
import createClient from '@state/apollo-client';
import { register } from './sw';
import App from './app';

if (!isFunction(Number.isFinite)) {
  Number.isFinite = isFinite;
}

consolidateStreamedStyles();

ReactDOM.hydrate(
  <ApolloProvider client={createClient()}>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={createStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

register();
