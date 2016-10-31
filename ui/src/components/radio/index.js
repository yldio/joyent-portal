const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Radio = ({
  checked,
  children,
  className,
  defaultChecked,
  disabled = false,
  form,
  id,
  label,
  name,
  onChange,
  readOnly,
  required,
  selectionDirection,
  style,
  tabIndex,
  value
}) => {
  const _label = label || children;
  const _children = label && children ? children : null;

  const cn = classNames(
    className,
    styles.radio
  );

  const labelledby = `${styles.label}-label`;

  return (
    <div className={cn}>
      <label className={styles.label} htmlFor={id}>
        <input
          aria-labelledby={labelledby}
          checked={checked}
          className={styles.input}
          defaultChecked={defaultChecked}
          disabled={disabled}
          form={form}
          id={id}
          name={name}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
          selectionDirection={selectionDirection}
          tabIndex={tabIndex}
          type='radio'
          value={value}
        />
        <span className={styles.span} id={labelledby}>
          {_label}
        </span>
      </label>
      <span>
        {_children}
      </span>
    </div>
  );
};

Radio.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  value: React.PropTypes.string.isRequired
};

module.exports = Radio;
