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
  projects: {
    data: [{
      uuid: 'e0ea0c02-55cc-45fe-8064-3e5176a59401',
      org: 'e12ad7db-91b2-4154-83dd-40dcfc700dcc',
      id: 'forest-foundation-dev',
      name: 'Forest Foundation Dev',
      plan: '20.05$ per day'
    }, {
      uuid: '9fcb374d-a267-4c2a-9d9c-ba469b804639',
      org: 'e12ad7db-91b2-4154-83dd-40dcfc700dcc',
      id: 'forest-foundation-testing',
      name: 'Forest Foundation Testing',
      plan: '20.05$ per day'
    }, {
      uuid: 'ac2c2498-e865-4ee3-9e26-8c75a81cbe25',
      org: 'e12ad7db-91b2-4154-83dd-40dcfc700dcc',
      id: 'forest-foundation-production',
      name: 'Forest Foundation Production',
      plan: '100.17$ per day'
    }]
  },
  orgs: {
    ui: {
      sections: [
        'projects',
        'people',
        'settings'
      ]
    },
    data: [{
      hide: ['people'],
      owner: 'b94033c1-3665-4c36-afab-d9c3d0b51c01',
      id: 'nicola',
      name: 'Your Dashboard'
    }, {
      owner: 'b94033c1-3665-4c36-afab-d9c3d0b51c01',
      uuid: 'e12ad7db-91b2-4154-83dd-40dcfc700dcc',
      id: 'biz-tech',
      name: 'BizTech'
    }, {
      owner: 'b94033c1-3665-4c36-afab-d9c3d0b51c01',
      uuid: '551f316d-e414-480f-9787-b4c408db3edd',
      id: 'make-us-proud',
      name: 'Make Us Proud',
    }]
  },
  account: {
    data: {
      uuid: 'b94033c1-3665-4c36-afab-d9c3d0b51c01',
      id: 'nicola',
      name: 'Nicola'
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
