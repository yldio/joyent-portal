const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Item = ({
  children,
  checked = false,
  disabled = false,
  onClick,
  tabIndex
}) => {
  const cn = classNames(
    styles.item,
    disabled ? styles.disabled : '',
    checked ? styles.checked : ''
  );

  return (
    <div
      aria-checked={checked}
      aria-disabled={disabled}
      className={cn}
      onClick={onClick}
      role='radio'
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

Item.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.number
};

module.exports = Item;
