const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRouter = require('react-router');
const ReactRedux = require('react-redux');

const App = require('./containers/app');
const NotFound = require('./containers/not-found');
const Home = require('./containers/home');
const Print = require('./containers/print');

const store = require('./store');

const {
  AppContainer
} = ReactHotLoader;

const {
  BrowserRouter,
  Miss,
  Match
} = ReactRouter;

const {
  Provider
} = ReactRedux;

module.exports = () => {
  return (
    <AppContainer>
      <Provider store={store()}>
        <BrowserRouter>
          <App>
            <Match exactly pattern='/' component={Home} />
            <Match pattern='/print' component={Print} />
            <Miss component={NotFound}/>
          </App>
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
};
