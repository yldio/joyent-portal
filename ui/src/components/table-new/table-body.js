// const composers = require('../../shared/composers');

const React = require('react');
// const Styled = require('styled-components');
//
// const {
//   default: styled,
// } = Styled;

// const {
//   clearfix
// } = composers;

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

const TableRows = ({
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

TableRows.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array
};

const TableBody = ({
  columns,
  data
}) => {
  return (
    <TableRows columns={columns} data={data} />
  );
};

TableBody.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array
};

module.exports = TableBody;