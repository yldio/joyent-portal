const React = require('react');
const CSSModules = require('react-css-modules');
const styles = require('./home.css');

console.log('STYLES ', styles)

module.exports = () => {
  return (
    <div className={styles.home}>
      <h1>Home</h1>
    </div>
  );
};
