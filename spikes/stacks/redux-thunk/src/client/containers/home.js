const ReactRouter = require('react-router');
const React = require('react');

const {
  Link
} = ReactRouter;

module.exports = () => {
  return (
    <div>
      <Link to='/print'>Start</Link>
    </div>
  );
};
