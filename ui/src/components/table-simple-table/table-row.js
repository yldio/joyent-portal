import { remcalc } from '../../shared/functions';
import { clearfix, Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled, { css } from 'styled-components';
import React from 'react';

const StyledTableRow = styled.div`
  ${clearfix}

  padding: ${remcalc(24)} 0;
  border-bottom: solid 1px ${colors.base.grey};

  & > .table-item {
    text-align: center;

    ${props => {
      const width = 100 / props.itemCount;
      return css`
        width: ${width}%;
      `;
    }}
  }
`;

const TableRow = ({
  children,
  ...props
}) => (
  <StyledTableRow itemCount={children.length} {...props}>
    {children}
  </StyledTableRow>
);

TableRow.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  TableRow
);
