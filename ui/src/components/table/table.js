const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledTableWrapper = styled.section`
  border: solid 1px #d8d8d8
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

// const StyledTableHead = styled.thead``;
// const StyledTableBody = styled.tbody``;

// const renderTable = ({
//   hasHeader = false,
//   hasBody = true,
//   width = '100%'
// }) => {
//
//   const tableBody = () => {
//
//     return (
//       <StyledTableBody />
//     )
//   }
//
// }

const Table = ({
  children,
  title,
}) => {

  return (
    <StyledTableWrapper>
      {children}
    </StyledTableWrapper>
  );
};

Table.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
};

module.exports = Table;
