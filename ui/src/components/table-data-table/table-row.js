const React = require('react');

const Row = ({
  dataItem = {}
}) => {
  const _dataItem = dataItem;

  const rowItems = Object.keys(_dataItem).map( (item, i) => {
    const value = _dataItem[item];

    return <td key={i}>{value}</td>;
  });

  return (
    <tr>
      {rowItems}
    </tr>
  );
};

Row.propTypes = {
  dataItem: React.PropTypes.object
};

module.exports = Row;