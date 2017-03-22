import { clearfix, Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import styled from 'styled-components';
import React from 'react';

const StyledTableBody = styled.article`
  box-shadow: 0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05);
  ${clearfix}
`;

const TableBody = ({
  children,
  ...props
}) => children.length <= 1 ? null : (
  <StyledTableBody {...props}>
    {children}
  </StyledTableBody>
);

TableBody.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  StyledTableBody
);
