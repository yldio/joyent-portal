const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const App = require('./app');
const Topology = require('./topology');

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

const {
  Router,
  Route,
  IndexRoute,
  browserHistory
} = ReactRouter;

module.exports = ({
  store
}) => {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Topology} />
          </Route>
        </Router>
      </Provider>
    </AppContainer>
  );
};
