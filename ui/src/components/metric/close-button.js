import styled from 'styled-components';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import ButtonIcon from './button-icon';
import CloseIcon from '../icons/close';
import React from 'react';

const StyledCloseIcon = styled(CloseIcon)`
  fill: ${colors.base.white};
`;

const CloseButton = (props) => (
  <ButtonIcon name='close-button' {...props}>
    <StyledCloseIcon />
  </ButtonIcon>
);

export default Baseline(
  CloseButton
);
