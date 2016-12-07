const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const Graph = require('./graph');

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

module.exports = ({
  store
}) =>
  <AppContainer>
    <Provider store={store}>
      <Graph />
    </Provider>
  </AppContainer>;
