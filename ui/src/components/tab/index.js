const paramCase = require('param-case');
const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Tab = ({
  className,
  children,
  checked,
  defaultChecked = true,
  disabled = false,
  id,
  name,
  title = '',
  style
}) => {
  const cn = classNames(
    className,
    styles.tab
  );

  const tabId = paramCase(title);

  return (
    <div className={cn}>
      <input
        checked={checked}
        className={styles.input}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={tabId}
        name={name}
        type='radio'
      />
      <label className={styles.label} htmlFor={tabId}>
        {title}
      </label>
      <div className={styles.panel}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

Tab.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  title: React.PropTypes.string
};

module.exports = Tab;
