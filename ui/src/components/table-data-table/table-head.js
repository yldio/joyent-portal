const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledTableHeadItem = styled.td`
  ${props => `width: ${props.width}`}
  border-bottom: none;
  padding: ${remcalc(24)};
`;

const StyledTableHead = styled.thead`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid ${remcalc(1)} #d8d8d8;
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
    <StyledTableHead>
      <tr>
        {titles}
      </tr>
    </StyledTableHead>
  );
};

TableHeader.propTypes = {
  columns: React.PropTypes.array
};

module.exports = TableHeader;