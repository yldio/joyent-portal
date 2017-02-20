import { remcalc } from '../../shared/functions';
import { breakpoints, colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const StyledRow = styled.tr`
  border: solid ${remcalc(1)} ${colors.base.grey};
};

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

export default Baseline(
  Row
);
