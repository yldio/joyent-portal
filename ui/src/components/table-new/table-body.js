const composers = require('../../shared/composers');

const React = require('react');
const Styled = require('styled-components');

const {
  default: styled,
} = Styled;

const {
  clearfix
} = composers;

const Row = ({st
  dataItem
}) => {
  const _dataItem = dataItem;


  Object.keys(_dataItem).forEach( (item, i) => {
    const value = _dataItem[item];

    return <td key={i}>{value}</td>;
  });
};

const TableRows = ({
  columns,
  data
}) => {

  const rows = columns.map( (column, index) => {
    return <Row dataItem={data[index]} key={index} />
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

const TableBody = ({
  columns,
  data
}) => {
  return (
    <TableRows data={data} columns={columns} />
  );
};

TableBody.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array
};

module.exports = TableBody;