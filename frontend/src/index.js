import { IntlProvider } from 'react-intl-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import React from 'react';

import App from '@containers/app';
import MockState from './mock-state.json';
import Store from '@state/store';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, {
    ReactDOM
  });
}

ReactDOM.render(
  <Provider store={Store(MockState)}>
    <IntlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
