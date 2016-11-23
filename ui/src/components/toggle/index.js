// TODO: use a checkbox

const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Toggle = ({
  checked = false,
  className,
  style
}) => {
  const tgl = classNames(
    className,
    styles.tgl,
    checked ? styles.on : styles.off,
  );

  const input = classNames(
    className,
    styles.input
  );

  const label = classNames(
    className,
    styles['tgl-label']
  );

  return (
    <div className='' style={style}>
      <label className={tgl} htmlFor='toggle' >
        <input
          checked={checked}
          className={input}
          id='toggle'
          type='checkbox'
        />
        <div className={label} />
      </label>
    </div>
  );
};

Toggle.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Toggle;
