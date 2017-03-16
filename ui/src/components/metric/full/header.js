import { Baseline } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import { remcalc } from '../../../shared/functions';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  background-color: ${colors.base.primaryDesaturated};
  border: solid ${remcalc(1)} ${colors.base.primaryDesaturated};
`;

const Header = ({
  children,
  ...props
}) => (
  <StyledHeader {...props}>
    {children}
  </StyledHeader>
);

Header.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Header
);
