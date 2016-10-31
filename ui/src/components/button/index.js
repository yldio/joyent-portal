const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Button = ({
  autoFocus,
  children,
  className,
  disabled = false,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget,
  name,
  secondary = false,
  style,
  type,
  value
}) => {
  const cn = classNames(
    className,
    styles.button,
    secondary ? styles.secondary : styles.primary,
    disabled ? styles.inactive : '',
  );

  return (
    <button
      autoFocus={autoFocus}
      className={cn}
      disabled={disabled}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      name={name}
      style={style}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  formAction: React.PropTypes.string,
  formEncType: React.PropTypes.string,
  formMethod: React.PropTypes.string,
  formNoValidate: React.PropTypes.bool,
  formTarget: React.PropTypes.string,
  name: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  value: React.PropTypes.string
};

module.exports = Button;
