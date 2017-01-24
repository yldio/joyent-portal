const React = require('react');

const PersonRole = (props) => {

  const {
    role
  } = props;

  return (
    <span>{role}</span>
  );
};

PersonRole.propTypes = {
  role: React.PropTypes.string
};

module.exports = PersonRole;