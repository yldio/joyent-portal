const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledRow = styled.tr`
  border: solid ${remcalc(1)} #d8d8d8;
`;

const StyledTaleItem = styled.td`
  padding: ${remcalc(24)};
`;

const Row = ({
  dataItem = {}
}) => {
  const _dataItem = dataItem;

  const rowItems = Object.keys(_dataItem).map( (item, i) => {
    const value = _dataItem[item];

    return <StyledTaleItem key={i}>{value}</StyledTaleItem>;
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