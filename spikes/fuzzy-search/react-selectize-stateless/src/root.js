const ReactRedux = require('react-redux');
const ReactHotLoader = require('react-hot-loader');
const React = require('react');
const Search = require('./search');

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
        <Search />
      </Provider>
    </AppContainer>
  );
};
