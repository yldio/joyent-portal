const ReactRedux = require('react-redux');
const React = require('react');

const {
  connect
} = ReactRedux;

const App = React.createClass({
  componentDidMount: function() {
    require('../worker').on('action', (action) => {
      this.props.dispatch(action);
    });
  },
  render: function() {
    const {
      children
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
});

module.exports = connect()(App);
