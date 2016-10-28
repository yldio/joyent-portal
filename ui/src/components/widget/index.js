const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Widget = ({
  children,
  selectable = 'single',
  name,
  className,
  style
}) => {

  const cn = classNames(
    className,
    styles.widget
  );

  const type = selectable === 'single' ? 'radio' : 'checkbox';

  return (
    <label className={cn} htmlFor={name}>
      <input
        className={styles.input}
        name={name}
        type={type}
      />
      <div className={styles.content}>
        {children}
      </div>
    </label>
  );
};

Widget.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  selectable: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Widget;
