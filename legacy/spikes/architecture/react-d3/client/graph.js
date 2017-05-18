const ReactRedux = require('react-redux');
const React = require('react');
const Links = require('./links');
const Nodes = require('./nodes');

const {
  connect
} = ReactRedux;

const Component = (props) =>
  <svg width='960' height='600'>
    <Links {...props}/>
    <Nodes {...props}/>
  </svg>;

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(
  mapStateToProps
)(Component);
