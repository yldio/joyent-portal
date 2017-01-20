const React = require('react');
const Styled = require('styled-components');

const TableBody = require('./table-body');
const TableHeader = require('./table-head');

const {
  default: styled
} = Styled;

const StyledTableWrapper = styled.section`
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

// const StyledTableHead = styled.thead``;
// const StyledTableBody = styled.tbody``;

const StyledTitle = styled.h3`
  text-align: center
`;

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

const Table = ({
  children,
  columns = [],
  data = [],
  title,
}) => {

  return (

    <StyledTableWrapper>
      <StyledTitle>{title}</StyledTitle>

      <TableContent
        columns={columns}
        data={data}
      />
    </StyledTableWrapper>
  );
};

Table.propTypes = {
  children: React.PropTypes.node,
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  title: React.PropTypes.string,
};

module.exports = Table;
