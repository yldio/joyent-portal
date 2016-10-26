const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Tabs = ({
  className,
  children, // array of <Tab>
  id,
  name = '',
  style
}) => {
  const cn = classNames(
    className,
    styles.tabs
  );

  const _children = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      defaultChecked: i === 0,
      name
    });
  });

  return (
    <div
      className={cn}
      id={id}
      role='tablist'
      style={style}
    >
      {_children}
    </div>
  );
};

Tabs.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = Tabs;
