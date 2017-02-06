const React = require('react');
const ReactRouter = require('react-router-dom');

const {
  Redirect
} = ReactRouter;

module.exports = (to) => () => (
  <Redirect to={to} />
);
