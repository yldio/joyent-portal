// TODO: use a checkbox

const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Avatar = ({
  color,
  src,
  name = '',
  className,
  style
}) => {

  const cn = classNames(
    className,
    styles.avatar
  );

  style = {
    ...style,
    background: color
  };

  const letter = name.split('')[0];
  const av = src ? (
    <img
      alt={name}
      className={styles.picture}
      src={src}
      style={style}
    />
  ) : (
    <p
      className={styles.letter}
      style={style}
    >
      {letter}
    </p>
  );

  return (
    <div className={cn} style={style}>
      {av}
    </div>
  );
};

Avatar.propTypes = {
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  name: React.PropTypes.string,
  src: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Avatar;
