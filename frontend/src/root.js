const React = require('react');
const ReactIntlRedux = require('react-intl-redux');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');

const App = require('@containers/app');
const Store = require('@state/store');

const {
  IntlProvider
} = ReactIntlRedux;

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

const {
  BrowserRouter
} = ReactRouter;

const store = Store(require('./mock-state.json'));

module.exports = () => {
  return (
    <AppContainer>
      <Provider store={store}>
        <IntlProvider>
          <BrowserRouter>
            {App}
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    </AppContainer>
  );
};
