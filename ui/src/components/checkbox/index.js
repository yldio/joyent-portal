const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Checkbox = ({
  checked = false,
  className,
  children,
  disabled = false,
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
    <label className={styles.label}>
      <input
        className={cn}
        style={style}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        type='checkbox'
      />
      <span>{children}</span>
    </label>
  );
};

Checkbox.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = Checkbox;
