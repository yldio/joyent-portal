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

const StyledTableHead = styled.thead``;
const StyledTableBody = styled.tbody``;

const StyledTitle = styled.h3`
  text-align: center
`;

const TableContent = ({
  columns,
  data,
  hasHeader = false,
  hasBody = data.length >= 1,
  width = '100%'
}) => {

  return (
    <table>
      {hasHeader ? <TableHeader columns={columns} /> : null}
      {hasBody ? <TableBody data={data} columns={columns} /> : null}
    </table>
  )
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
