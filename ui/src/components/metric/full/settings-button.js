import React from 'react';
import styled from 'styled-components';
import { remcalc } from '../../../shared/functions';
import { colors } from '../../../shared/constants';
import { Baseline } from '../../../shared/composers';
import ButtonIcon from './button-icon';
import SettingsIcon from '../../icons/settings';

const StyledSettingsIcon = styled(SettingsIcon)`
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
    <ButtonIcon
      name='add-metric-button'
      onClick={handleClick}
      {...props}
    >
      <StyledSettingsIcon />
      {children}
    </ButtonIcon>
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
