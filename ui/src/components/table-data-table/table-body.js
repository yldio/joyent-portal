const composers = require('../../shared/composers');
const React = require('react');

const Row = require('./table-row');

const {
  Baseline
} = composers;

const TableBody = ({
  columns,
  data
}) => {
  const rows = columns.map((column, index) => (
    <Row dataItem={data[index]} key={index} />
  ));

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

module.exports = Baseline(
  TableBody
);
