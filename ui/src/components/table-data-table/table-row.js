const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');
const constants = require('../../shared/constants');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const {
  breakpoints,
  colors
} = constants;

const StyledRow = styled.tr`
  border: solid ${remcalc(1)} ${colors.base.greyDark};

  ${breakpoints.smallOnly`
    display: block;
  `}
`;

const StyledTableItem = styled.td`
  padding: ${remcalc(24)};

  ${breakpoints.smallOnly`
    display: block;
  `}
`;

const Row = ({
  dataItem = {}
}) => {
  const _dataItem = dataItem;

  const rowItems = Object.keys(_dataItem).map( (item, i) => {
    const value = _dataItem[item];

    return <StyledTableItem key={i}>{value}</StyledTableItem>;
  });

  return (
    <StyledRow>
      {rowItems}
    </StyledRow>
  );
};

Row.propTypes = {
  dataItem: React.PropTypes.object
};

module.exports = Row;