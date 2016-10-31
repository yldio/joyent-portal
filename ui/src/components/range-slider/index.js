const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const RangeSlider = ({
  className,
  style
}) => {

  const slider = classNames(
    className,
    styles.input
  );

  // TODO: Get rid of inline styles
  style = {
    ...style,
    display: 'block'
  };

  return (
    <input
      className={slider}
      style={style}
      type="range"
    />
  );
};

RangeSlider.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = RangeSlider;
