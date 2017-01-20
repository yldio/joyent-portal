// const fns = require('../../shared/functions');
// const composers = require('../../shared/composers');

const React = require('react');
const Styled = require('styled-components');

// const {
//   remcalc
// } = fns;

const {
  default: styled,
  // css
} = Styled;

// const {
//   clearfix
// } = composers;

// const StyledTableHead = styled.header`
//   background: #fafafa;
//   box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
//   padding: ${remcalc(24)} 0;
//
//   ${clearfix}
//
//   & > .table-item {
//     text-align: center;
//
//     ${props => {
//       const width = 100 / props.itemCount;
//       return css`
//         width: ${width}%;
//       `;
//     }}
//   }
// `;

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