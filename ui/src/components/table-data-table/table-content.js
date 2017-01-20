const React = require('react');
const Styled = require('styled-components');

const TableBody = require('./table-body');
const TableHeader = require('./table-head');

const {
  default: styled
} = Styled;

const StyledTable = styled.table`
  width: 100%;
`;

const TableContent = ({
  columns,
  data,
  hasHeader = columns.length >= 1,
  hasBody = data.length >= 1,
  width = '100%'
}) => {

  return (
    <StyledTable>
      {hasHeader ? <TableHeader columns={columns} /> : null}
      {hasBody ? <TableBody columns={columns} data={data} /> : null}
    </StyledTable>
  );
};

TableContent.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  hasBody: React.PropTypes.bool,
  hasHeader: React.PropTypes.bool,
  width: React.PropTypes.string,
};

module.exports = TableContent;
