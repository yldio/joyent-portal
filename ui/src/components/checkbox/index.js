const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Checkbox = ({
  checked = false,
  className,
  children,
  disabled = false,
  id,
  onChange,
  style
}) => {
  const cn = classNames(
    className,
    styles.checkbox,
    checked ? styles.checked : '',
    disabled ? styles.disabled : ''
  );

  return (
    <label className={styles.label} htmlFor={id}>
      <input
        checked={checked}
        className={cn}
        disabled={disabled}
        id={id}
        onChange={onChange}
        style={style}
        type='checkbox'
      />
      <span>{children}</span>
    </label>
  );
};

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = Checkbox;
