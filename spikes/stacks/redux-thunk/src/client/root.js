const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRouter = require('react-router');
const ReactRedux = require('react-redux');
const ReactIntl = require('react-intl');

const App = require('./containers/app');

const store = require('./store');

const {
  AppContainer
} = ReactHotLoader;

const {
  BrowserRouter,
} = ReactRouter;

const {
  Provider
} = ReactRedux;

const {
  IntlProvider
} = ReactIntl;

// http://stackoverflow.com/a/38150585
const locale = (
  navigator.languages && navigator.languages[0] || // Chrome / Firefox
  navigator.language ||   // All browsers
  navigator.userLanguage // IE <= 10
);

module.exports = () => {
  return (
    <AppContainer>
      <Provider store={store()}>
        <IntlProvider
          locale={locale}
          defaultLocale='en'
        >
          <BrowserRouter>{App}</BrowserRouter>
        </IntlProvider>
      </Provider>
    </AppContainer>
  );
};
