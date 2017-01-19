const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledTable = styled.section`
  border: solid 1px #d8d8d8
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

const Table = ({
  children
}) => {

  return (
    <StyledTable>
      {children}
    </StyledTable>
  );
};

Table.propTypes = {
  children: React.PropTypes.node
};

module.exports = Table;
