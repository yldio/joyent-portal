const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Radio = ({
  name,
  value,
  label,
  checked,
  disabled = false,
  className,
  id,
  onChange,
  style
}) => {

  const cn = classNames(
    className,
    styles.radio
  );

  return (
    <label className={cn} htmlFor={id}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        type='radio'
        value={value}
      />
      <span>{label}</span>
    </label>
  );
};

Radio.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  label: React.PropTypes.node,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

module.exports = Radio;
