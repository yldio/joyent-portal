// TODO: use a checkbox

const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Avatar = ({
  image,
  name,
  className,
  style
}) => {

  const cn = classNames(
    className,
    styles.avatar
  );

  const fill = () => {
    if ( image ) {
      return (
        <img
          alt={name}
          className={styles.picture}
          src={image}
          />
      );
    } else {
      const letter = name.split('')[0];
      return (
          <p className={styles.letter}>{letter}</p>
      );
    }
  }

  return (
    <div className={cn}>
      {fill()}
    </div>
  );
};

Avatar.propTypes = {
  className: React.PropTypes.string,
  image: React.PropTypes.string,
  name: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Avatar;
