const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const Matrix = require('./matrix');

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

module.exports = ({
  store
}) => {
  return (
    <AppContainer>
      <Provider store={store}>
        <Matrix />
      </Provider>
    </AppContainer>
  );
};
