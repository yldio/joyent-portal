const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Input = ({
  autoComplete,
  autoFocus,
  children,
  className,
  disabled = false,
  form,
  id,
  inputMode,
  label,
  list,
  name,
  onChange,
  pattern,
  placeholder,
  readOnly,
  required,
  selectionDirection,
  spellCheck,
  style,
  tabIndex,
  type,
  value
}) => {
  const _label = label || children;
  const _children = label && children ? children : null;

  const cn = classNames(
    className,
    styles['input-group']
  );

  const labelledby = `${styles.label}-label`;

  return (
    <div className={cn}>
      <label className={styles.label} htmlFor={id}>
        {_label}
      </label>
      <input
        aria-labelledby={labelledby}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={styles.input}
        disabled={disabled}
        form={form}
        id={id}
        inputMode={inputMode}
        list={list}
        name={name}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        selectionDirection={selectionDirection}
        spellCheck={spellCheck}
        tabIndex={tabIndex}
        type={type}
        value={value}
      />
      {_children}
    </div>
  );
};

Input.propTypes = {
  autoComplete: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  inputMode: React.PropTypes.string,
  label: React.PropTypes.string,
  list: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  pattern: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  spellCheck: React.PropTypes.bool,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.string
};

module.exports = Input;
