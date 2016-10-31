// TODO: use a checkbox

const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Avatar = ({
  alt,
  className,
  color,
  crossorigin,
  longdesc,
  name = '',
  sizes,
  src,
  srcset,
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
      alt={alt || name}
      className={styles.picture}
      crossOrigin={crossorigin}
      longdesc={longdesc}
      sizes={sizes}
      src={src}
      srcSet={srcset}
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
  alt: React.PropTypes.string,
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  crossorigin: React.PropTypes.string,
  longdesc: React.PropTypes.string,
  name: React.PropTypes.string,
  sizes: React.PropTypes.string,
  src: React.PropTypes.string,
  srcset: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Avatar;


