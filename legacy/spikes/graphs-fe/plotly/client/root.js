const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const PlotlyGraph = require('./plotly');


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
        <PlotlyGraph />
      </Provider>
    </AppContainer>
  );
};
