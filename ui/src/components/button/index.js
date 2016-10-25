const React = require('react');
const styles = require('./style.css');

const Button = ({
  disabled = false,
  className,
  style,
  children
}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  style: React.PropTypes.object
};

module.exports = Button;
