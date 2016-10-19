const React = require('react');
const styles = require('./index.css');

module.exports = ({
  children
}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
