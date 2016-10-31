const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Checkbox = ({
  checked = false,
  children,
  className,
  disabled = false,
  form,
  id,
  name,
  onChange,
  readOnly,
  required,
  selectionDirection,
  style,
  tabIndex
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
        form={form}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        selectionDirection={selectionDirection}
        style={style}
        tabIndex={tabIndex}
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
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string
};

module.exports = Checkbox;
