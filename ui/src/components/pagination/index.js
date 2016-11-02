const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Pagination = ({
  children,
  className,
  label
}) => {
  const cn = classNames(
    className,
    styles.pagination
  );

  const pages = React.Children.map(children, (child) => {
    const cn = classNames(
      child.props.className,
      child.props.active ? styles.active : '',
      styles.pagination_item
    );

    return (
      <li className={cn}>
        {child}
      </li>
    );
  });

  return (
    <nav aria-label={label} className={cn}>
      <ul className={styles.paginatation_list}>
        {pages}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  label: React.PropTypes.string
};

module.exports = Pagination;
