const React = require('react');
const ReactIntlRedux = require('react-intl-redux');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');

const App = require('@containers/app');
const Store = require('@state/store');

const {
  IntlProvider
} = ReactIntlRedux;

const {
  Provider
} = ReactRedux;

const {
  BrowserRouter
} = ReactRouter;

const store = Store(require('./mock-state.json'));

module.exports = () => {
  return (
    <Provider store={store}>
      <IntlProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};
