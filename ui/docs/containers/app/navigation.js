const classNames = require('classnames');
const paramCase = require('param-case');
const React = require('react');
const ReactRouter = require('react-router');

const Docs = require('../../../src/docs');
const styles = require('./style.css');

const {
  Link
} = ReactRouter;

const getList = (items, parent) => {
  let isNested = false;

  const lis = Object.keys(items).map((name) => {
    const item = items[name];
    const param = paramCase(name);
    const href = parent ? `${parent}/${param}` : `/${param}`;

    isNested = (typeof item !== 'string');

    return (
      <li className={styles.item} key={href}>
        <Link to={href}>{name}</Link>
        {isNested ? getList(item, href) : null}
      </li>
    );
  });

  const cn = classNames(
    isNested ? styles['is-nested'] : ''
  );

  return (
    <ul className={cn}>
      {lis}
    </ul>
  );
};

module.exports = () => {
  return (
    <div>
      <div className={styles.navigation}>
        <nav role='navigation'>
          {getList(Docs)}
        </nav>
      </div>
    </div>
  );
};
