import React from 'react';
import { IntlProvider } from 'react-intl-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@containers/app';
import Store from '@state/store';
import MockState from './mock-state.json';

export default () => (
  <Provider store={Store(MockState)}>
    <IntlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);
