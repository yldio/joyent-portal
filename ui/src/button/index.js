const React = require('react');
const styles = require('./style.css');

module.exports = ({
  disabled = false,
  children
}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
