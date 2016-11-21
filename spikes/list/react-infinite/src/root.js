const ReactRedux = require('react-redux');
const ReactHotLoader = require('react-hot-loader');
const React = require('react');
const List = require('./list');

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
        <List />
      </Provider>
    </AppContainer>
  );
};
