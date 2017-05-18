const React = require('react');
const Styled = require('styled-components');
const ReactRouter = require('react-router');

const {
  default: styled
} = Styled;

const {
  Link
} = ReactRouter;

const App = React.createClass({
  render: function() {
    const {
      children
    } = this.props;

    return (
        <div>
          <div>
          { children }
          </div>
        </div>
    );
  }
});

module.exports = App;
