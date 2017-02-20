import React from 'react';
import styled from 'styled-components';
import { remcalc } from '../../shared/functions';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import CloseIcon from './close.svg';

const StyledButton = styled.button`
  position: relative;
  display: flex;
  margin: 0;
  padding: ${remcalc(18)} ${remcalc(24)};
  float: right;
  background-color: ${colors.base.primaryDesaturated};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturated};
  cursor: pointer;
`;

const StyledIcon = styled(CloseIcon)`
  fill: ${colors.base.white};
`;

const AddMetricButton = (props) => (
  <StyledButton
    name='close-button'
    {...props}
  >
    <StyledIcon />
  </StyledButton>
);

export default Baseline(
  AddMetricButton
);
