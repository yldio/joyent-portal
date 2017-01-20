const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledTableHeadItem = styled.td`
  ${props => `width: ${props.width}`}
`;

const TableHeader = ({
  columns
}) => {

  const fallBackWidth = `${100 / parseInt(columns.length)}%`;

  const titles = columns.map( (column, i) => {

    return (
      <StyledTableHeadItem
        key={i}
        width={column.width || fallBackWidth}
      >
        {column.title}
      </StyledTableHeadItem>
    );
  });

  return (
    <thead>
      <tr>
        {titles}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: React.PropTypes.object
};

module.exports = TableHeader;