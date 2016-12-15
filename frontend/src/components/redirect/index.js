const React = require('react');
const ReactRouter = require('react-router');

const {
  Redirect
} = ReactRouter;

module.exports = (to) => () => {
  return (
    <Redirect to={to} />
  );
};
