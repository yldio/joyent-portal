const get = require('lodash.get');
const InnerHTML = require('dangerously-set-inner-html');
const React = require('react');
const titleCase = require('title-case');

const Docs = require('../../../src/docs');

const Item = ({
  params
}) => {
  const path = (params.parent !== 'undefined')
    ? `${titleCase(params.parent)}.${titleCase(params.name)}`
    : `${titleCase(params.name)}`;

  const body = get(Docs, path);
  const item = body ? (
    <InnerHTML html={body} />
  ) : (
    <h1>{path} Not Found</h1>
  );

  return (
    <div>
      {item}
    </div>
  );
};

Item.propTypes = {
  params: React.PropTypes.object
};

module.exports = Item;
