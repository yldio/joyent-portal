import { remcalc } from '../../shared/functions';
import { clearfix, Baseline } from '../../shared/composers';
import styled, { css } from 'styled-components';
import React from 'react';

const StyledTableHead = styled.header`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  padding: ${remcalc(24)} 0;

  ${clearfix}

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

const TableHead = ({
  children,
  ...props
}) => children.length <= 1 ? null : (
  <StyledTableHead itemCount={children.length} {...props}>
    {children}
  </StyledTableHead>
);

TableHead.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  TableHead
);
