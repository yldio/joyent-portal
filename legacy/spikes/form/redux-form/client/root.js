const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const AppHome = require('./app');
const Form = require('./form/form');
const Multiform = require('./form/multiform');
const FormOne = require('./form/form-one');
const FormTwo = require('./form/form-two');
const FormThree = require('./form/form-three');
const FormNormalize = require('./form/form-normalize');

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

const {
  App,
  Home
} = AppHome;

module.exports = ({
  store
}) => {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="form" component={Form} />
            <Route path="form-one" component={FormOne} />
            <Route path="form-two" component={FormTwo} />
            <Route path="form-three" component={FormThree} />
            <Route path="form-normalize" component={FormNormalize} />
          </Route>
        </Router>
      </Provider>
    </AppContainer>
  );
};
