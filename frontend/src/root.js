const React = require('react');
const ReactIntlRedux = require('react-intl-redux');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

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

const store = Store({
  session: {
    data: {
      id: 'nicola',
      name: 'Nicola',
      projects: [],
      orgs: [{
        id: 'biz-tech',
        name: 'BizTech',
        pinned: true,
        projects: [{
          id: 'forest-foundation-dev',
          name: 'Forest Foundation Dev',
          plan: '20.05$ per day'
        }, {
          id: 'forest-foundation-testing',
          name: 'Forest Foundation Testing',
          plan: '20.05$ per day'
        }, {
          id: 'forest-foundation-production',
          name: 'Forest Foundation Production',
          plan: '100.17$ per day'
        }],
      }, {
        id: 'make-us-proud',
        name: 'Make Us Proud',
      }]
    }
  }
});

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
