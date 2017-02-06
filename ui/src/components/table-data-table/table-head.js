const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');
const constants = require('../../shared/constants');

const {
  remcalc
} = fns;

const {
  breakpoints,
  colors
} = constants;

const {
  default: styled
} = Styled;

const StyledTableHeadItem = styled.td`
  border-bottom: none;
  padding: ${remcalc(24)};

  ${breakpoints.medium`
    ${props => `width: ${props.mdWidth}`}
  `}
`;


const StyledTableHead = styled.thead`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid ${remcalc(1)} ${colors.base.greyDark};

  ${breakpoints.smallOnly`
    display: none;
  `}
`;
const TableHeader = ({
  columns
}) => {

  const fallBackWidth = `${100 / parseInt(columns.length)}%`;

  const titles = columns.map( (column, i) => {

    return (
      <StyledTableHeadItem
        key={i}
        mdWidth={column.width || fallBackWidth}
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