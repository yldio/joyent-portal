const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const Chart = require('./chart');


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
        <Chart />
      </Provider>
    </AppContainer>
  );
};
