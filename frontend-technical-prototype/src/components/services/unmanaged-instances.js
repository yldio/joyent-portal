import React from 'react';
import styled from 'styled-components';

import { remcalc } from '@ui/shared/functions';

import Button from '@ui/components/button';

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: ${remcalc(36)};
`;

const UnmanagedInstances = ({
  instances
}) => (
  <StyledButton tertiary>
    <strong>+ {instances} legacy instances.</strong>
    These instances do not belong to any particular service.
  </StyledButton>
);

UnmanagedInstances.propTypes = {
  instances: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.array
  ])
};

export default UnmanagedInstances;
