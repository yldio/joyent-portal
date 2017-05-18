const React = require('react');

module.exports = (props) => {
  return (
    <button>
      {props.children}
    </button>
  );
};
