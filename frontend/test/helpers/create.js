const React = require('react');
const ReactRedux = require('react-redux');
const ReactIntl = require('react-intl');
const ReactRouter = require('react-router-dom');
const createStore = require('@state/store');

const {
  addLocaleData,
  IntlProvider
} = ReactIntl;

const {
  Provider
} = ReactRedux;

const {
  BrowserRouter
} = ReactRouter;

const Messages = {
  'en-us': require('../../locales/en-us.json'),
  'pt-pt': require('../../locales/pt-pt.json')
};

const Locales = {
  'en': require('react-intl/locale-data/en'),
  'pt': require('react-intl/locale-data/pt')
};

const LocalesMessages = {
  'en-us': {
    messages: Messages['en-us'],
    locale: 'en'
  },
  'pt-pt': {
    messages: Messages['pt-pt'],
    locale: 'pt'
  }
};

Object.keys(Locales).forEach((lang) => {
  addLocaleData(Locales[lang] || []);
});

const withRedux = (children, {
  store = createStore()
} = {}) => (
  <Provider store={store}>
    {children}
  </Provider>
);

const withIntl = (children, {
  locale = 'en-us'
} = {}) => (
  <IntlProvider
    locale={LocalesMessages[locale].locale}
    messages={LocalesMessages[locale].messages}
  >
    {children}
  </IntlProvider>
);

const withRouter = (children, props = {}) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

module.exports = (children, props) =>
  withRouter(withRedux(withIntl(children), props));

module.exports.withIntl = withIntl;
module.exports.withRedux = withRedux;
module.exports.withRouter = withRouter;
