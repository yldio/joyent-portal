const React = require('react');

const Row = require('./table-row');

const TableBody = ({
  columns,
  data
}) => {
  const rows = columns.map( (column, index) => {
    return <Row dataItem={data[index]} key={index} />;
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

TableBody.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array
};

module.exports = TableBody;