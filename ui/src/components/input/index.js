const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Input = ({
  children,
  className,
  disabled = false,
  id,
  label,
  onChange,
  placeholder,
  style,
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
        className={styles.input}
        disabled={disabled}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {_children}
    </div>
  );
};

Input.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  value: React.PropTypes.string
};

module.exports = Input;
