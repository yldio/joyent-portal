const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const actions = require('../state/actions');
const Home = require('./home');
const NotFound = require('./not-found');

const {
  updateRouter
} = actions;

const {
  connect
} = ReactRedux;

const {
  Miss,
  Match
} = ReactRouter;

const App = connect()(React.createClass({
  componentWillMount: function() {
    const {
      router,
      dispatch
    } = this.props;

    // ugly hack needed because of a limitation of react-router api
    // that doens't pass it's instance to matched routes
    dispatch(updateRouter(router));
  },
  render: function() {
    const {
      children
    } = this.props;

    if (!Array.isArray(children)) {
      return children;
    }

    return (
      <div>
        {children}
      </div>
    );
  }
}));

module.exports = (props) => {
  return (
    <App {...props}>
      <Match exactly pattern='/' component={Home} />
      <Miss component={NotFound}/>
    </App>
  );
};
