const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRouter = require('react-router');

// const App = require('../src/components/icon/');
const App = require('./containers/app/');

const {
  AppContainer
} = ReactHotLoader;

const {
  BrowserRouter
} = ReactRouter;

module.exports = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>
  );
};
