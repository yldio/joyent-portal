const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const React = require('react');

const NotFound = require('./not-found');
const Home = require('./home');
const Print = require('./print');

const actions = require('../actions');

const {
  connect
} = ReactRedux;

const {
  Miss,
  Match
} = ReactRouter;

const {
  updateRouter
} = actions

const App = connect()(React.createClass({
  componentDidMount: function() {
    require('../worker').on('action', this.props.dispatch);
  },
  render: function() {
    const {
      children,
      router,
      dispatch
    } = this.props;

    // ugly hack needed because of a limitation of react-router api
    // that doens't pass it's instance to matched routes
    dispatch(updateRouter(router));

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
      <Match pattern='/print' component={Print} />
      <Miss component={NotFound}/>
    </App>
  );
};
