const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Widget = ({
  checked = false,
  children,
  className,
  disabled = false,
  name,
  selectable = 'single',
  style,
  value = name
}) => {

  const cn = classNames(
    className,
    styles.widget
  );

  const type = selectable === 'single' ? 'radio' : 'checkbox';

  return (
    <label className={cn} htmlFor={value}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        id={value}
        name={name}
        type={type}
        value={value}
      />
      <div className={styles.content}>
        {children}
      </div>
    </label>
  );
};

Widget.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string,
  selectable: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

module.exports = Widget;
