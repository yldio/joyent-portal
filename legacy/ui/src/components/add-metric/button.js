import React from 'react';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import Button from '../button';

const StyledButton = styled(Button)`
  position: absolute;
  left: ${remcalc(24)};
  bottom: ${remcalc(24)};
`;

const AddMetricButton = ({
  children,
  metric,
  onClick,
  ...props
}) => {
  const handleCLick = (e) => onClick(metric);

  return (
    <StyledButton
      name='add-metric-button'
      onClick={handleCLick}
      {...props}
    >
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
