const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Button = ({
  disabled = false,
  secondary = false,
  className,
  style,
  children
}) => {
  const cn = classNames(
    className,
    styles.button,
    secondary ? styles.secondary : styles.primary,
    disabled ? styles.inactive : '',
  );

  return (
    <button
      className={cn}
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
  secondary: React.PropTypes.bool,
  style: React.PropTypes.object
};

module.exports = Button;
