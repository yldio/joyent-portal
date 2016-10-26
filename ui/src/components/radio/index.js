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
    <label className={cn}>
      <input
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type="radio"
      />
      <span>{label}</span>
    </label>
  );
};

Radio.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

module.exports = Radio;
