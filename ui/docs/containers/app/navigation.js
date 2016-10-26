const paramCase = require('param-case');
const React = require('react');
const ReactRouter = require('react-router');

const Docs = require('../../../src/docs');

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
      <li key={href}>
        <Link to={href}>{name}</Link>
        {isNested ? getList(item, href) : null}
      </li>
    );
  });

  return (
    <ul>
      {lis}
    </ul>
  );
};

const Navigation = () => {
  return (
    <div>
      <div>
        <nav role='navigation'>
          {getList(Docs)}
        </nav>
      </div>
    </div>
  );
};

module.exports = Navigation;
