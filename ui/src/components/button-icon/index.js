const React = require('react');
const classNames = require('classnames');
const styles = require('./style.css');
const Button = require('../button');

const ButtonIcon = ({
  name = 'beer',
  className,
  iconSet = 'fa',
  style
}) => {

  const Component = require(`react-icons/lib/${iconSet}/${name}`);

  const cn = classNames(
    className,
    styles.icon
  );

  return (
    <div>
      <Button>
        <Component className={cn} style={style} />
      </Button>
    </div>
  );
};

ButtonIcon.propTypes = {
  className: React.PropTypes.string,
  iconSet: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = ButtonIcon;
