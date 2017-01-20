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
  padding-top: ${remcalc(24)};
  padding-bottom: ${remcalc(24)};
  border-bottom: none;
`;

const StyledTableHead = styled.thead`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
`;

const StyledTableHeadRow = styled.tr`
  border-left: solid ${remcalc(24)} transparent;
  border-right: solid ${remcalc(24)} transparent;
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
      <StyledTableHeadRow>
        {titles}
      </StyledTableHeadRow>
    </StyledTableHead>
  );
};

TableHeader.propTypes = {
  columns: React.PropTypes.array
};

module.exports = TableHeader;