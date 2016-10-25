const React = require('react');
const classNames = require('classnames');
const styles = require('./style.css');

const Base = ({
  children,
  className,
  style
}) => {
  const cn = classNames(
    className,
    styles.base
  );

  return (
    <div className={cn} style={style}>
      {children}
    </div>
  );
};

Base.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Base;
