const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Toggle = ({
  off = false,
  className,
  style
}) => {
  const tgl = classNames(
    className,
    styles.toggle,
    off ? styles.off : styles.on,
  );

  const btn = classNames(
    className,
    styles.btn
  );

  return (
    <div className={tgl} style={style}>
      <div className={btn} />
      <span className={styles.label}>
        {off ? 'Off' : 'On'}
      </span>
    </div>
  );
};

Toggle.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Toggle;
