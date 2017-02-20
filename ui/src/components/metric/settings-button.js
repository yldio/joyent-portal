import React from 'react';
import styled from 'styled-components';
import { remcalc } from '../../shared/functions';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import Button from '../button';
import SettingsIcon from './icon-settings.svg';

const StyledButton = styled(Button)`
  position: relative;
  display: flex;
  margin: 0;
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${colors.base.white};
  float: right;
  background-color: ${colors.base.primaryDesaturated};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturated};

  &:hover,
  &:focus,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.base.primaryLight};
    border: none;
    border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturatedHover};
  }
`;

const StyledIcon = styled(SettingsIcon)`
  fill: ${colors.base.primary};
  margin-right: ${remcalc(12)};
`;

const AddMetricButton = ({
  children,
  metric,
  onClick,
  ...props
}) => {
  const handleClick = (e) => onClick(metric);

  return (
    <StyledButton
      name='add-metric-button'
      onClick={handleClick}
      {...props}
    >
      <StyledIcon />
      {children}
    </StyledButton>
  );
};

AddMetricButton.propTypes = {
  children: React.PropTypes.node,
  metric: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Baseline(
  AddMetricButton
);
