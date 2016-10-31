const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Select = ({
  autoFocus,
  children,
  className,
  disabled,
  form,
  id,
  label,
  multiple,
  name,
  required,
  selected
}) => {
  const cn = classNames(
    className,
    styles['select-group']
  );

  return (
    <div className={cn}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <select
        autoFocus={autoFocus}
        className={styles.select}
        disabled={disabled}
        form={form}
        id={id}
        label={label}
        multiple={multiple}
        name={name}
        required={required}
        selected={selected}
      >
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  name: React.PropTypes.string,
  required: React.PropTypes.bool,
  selected: React.PropTypes.bool
};

module.exports = Select;
