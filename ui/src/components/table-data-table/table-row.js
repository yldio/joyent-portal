const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const composers = require('../../shared/composers');

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

const {
  Baseline
} = composers;

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
  const rowItems = Object.keys(dataItem).map((item, i) => (
    <StyledTableItem key={i}>{dataItem[item]}</StyledTableItem>
  ));

  return (
    <StyledRow>
      {rowItems}
    </StyledRow>
  );
};

Row.propTypes = {
  dataItem: React.PropTypes.object
};

module.exports = Baseline(
  Row
);
