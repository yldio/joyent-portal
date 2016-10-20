const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const App = require('./containers/app');
const store = require('./state/store');

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

const {
  BrowserRouter
} = ReactRouter;

module.exports = () => {
  return (
    <AppContainer>
      <Provider store={store()}>
        <BrowserRouter>
          {App}
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
};
