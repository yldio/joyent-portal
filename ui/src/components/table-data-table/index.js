const React = require('react');
const Styled = require('styled-components');

const TableContent = require('./table-content');

const {
  default: styled
} = Styled;

const StyledTitle = styled.h3`
  text-align: center
`;

const StyledTableWrapper = styled.section`
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
	
	${props => props.styles}
`;

const Table = ({
  children,
  columns = [],
  data = [],
  style,
  title,
}) => {

  return (

    <StyledTableWrapper styles={style}>
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
  style: React.PropTypes.object,
  title: React.PropTypes.string,
};

module.exports = Table;
