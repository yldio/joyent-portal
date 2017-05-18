import styled from 'styled-components';
import { colors } from '../../shared/constants';
import { unitcalc } from '../../shared/functions';
import Button from '../button';

const TooltipButton = styled(Button)`
  width: 100%;
  padding: ${unitcalc(1)} ${unitcalc(3)};
  background-color: ${colors.base.white};
  color: ${colors.base.secondary};
  text-align: left;
  border: none;
  box-shadow: none;

  &:focus {
    background-color: ${colors.base.white};
    color: ${colors.base.primary};
    border: none;
  }

  &:hover {
    background-color: ${colors.base.white};
    color: ${colors.base.primary};
    border: none;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.base.white};
    color: ${colors.base.primary};
    border: none;
  }
`;

export default TooltipButton;
