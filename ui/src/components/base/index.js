const React = require('react');
const classNames = require('classnames');
const styles = require('./style.css');

const Base = module.exports = ({
  className,
  style,
  children
}) => {
  const cn = classNames(
    className,
    styles.base
  );

  return (
    <div style={style} className={cn}>
      {children}
    </div>
  );
};

Base.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node
};
