const React = require('react');
// const icons = require('react-icons/md');

const Icon = ({
  name,
  className,
  style
}) => {
  // const Component = icons[name];
  // <Component className={className} style={style} />
  return (<div />);
};

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = Icon;
