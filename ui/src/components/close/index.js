import React from 'react';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';

const StyledButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: ${remcalc(16)};
  right: ${remcalc(16)};
`;

const Close = (props) => (
  <StyledButton {...props}>
    <img
      alt='Close'
      src='./close.svg'
    />
  </StyledButton>
);

export default Baseline(
  Close
);
