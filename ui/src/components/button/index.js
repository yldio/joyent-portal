const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Button = ({
  disabled = false,
  secundary = false,
  className,
  style,
  children
}) => {
  const cn = classNames(
    className,
    styles.button,
    secundary ? styles.secundary : styles.primary,
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
  secundary: React.PropTypes.bool,
  style: React.PropTypes.object
};

module.exports = Button;
