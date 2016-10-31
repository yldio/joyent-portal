const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Radio = ({
  checked,
  children,
  className,
  defaultChecked,
  disabled = false,
  id,
  label,
  name,
  onChange,
  style,
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
          id={id}
          name={name}
          onChange={onChange}
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
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
  value: React.PropTypes.string.isRequired
};

module.exports = Radio;
