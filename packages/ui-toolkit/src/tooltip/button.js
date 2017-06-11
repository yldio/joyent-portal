import React from 'react';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import theme from '../theme';
import Button from '../button';

const StyledButton = styled(Button)`
  width: 100%;
  padding: ${unitcalc(1)} ${unitcalc(3)};
  background-color: ${theme.white};
  color: ${theme.secondary};
  text-align: left;
  border: none;
  box-shadow: none;

  &:focus {
    background-color: ${theme.white};
    color: ${theme.primary};
    border: none;
  }

  &:hover {
    background-color: ${theme.white};
    color: ${theme.primary};
    border: none;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${theme.white};
    color: ${theme.primary};
    border: none;
  }
`;

const TooltipButton = props =>
  <li>
    <StyledButton {...props} />
  </li>;

export default TooltipButton;
