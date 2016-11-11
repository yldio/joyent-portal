const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const EpochGraph = require('./epoch');


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
        <EpochGraph />
      </Provider>
    </AppContainer>
  );
};
