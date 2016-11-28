const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');
const Icon = require('../icon');

const Notificaton = ({
  children,
  className,
  style,
  type = '',
  icon = ''
}) => {

  const cn = classNames(
    className,
    styles[`notification__${type}`],
    styles.notification
  );

  const iconClass = classNames(
    className,
    styles.notification__icon,
    styles[`notification__icon--${type}`]
  );

  return (
    <div
      className={cn}
      style={style}
      type={type}
    >
      { icon ? (
        <Icon
          className={iconClass}
          iconSet="fa"
          name={icon}
        />
      ) : null }
      <div className={styles.notification__content}>
        {children}
      </div>
    </div>
  );
};

Notificaton.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.str,
  icon: React.PropTypes.str,
  style: React.PropTypes.object,
  type: React.PropTypes.str
};

module.exports = Notificaton;
