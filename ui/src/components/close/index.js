import React from 'react';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import CloseSVG from '../../assets/icons/close.svg';

const StyledButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: ${remcalc(16)};
  right: ${remcalc(16)};
`;

const Close = ({
  children,
  ...props
}) => (
  <StyledButton {...props}>
    <CloseSVG />
    {children}
  </StyledButton>
);

Close.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Close
);
