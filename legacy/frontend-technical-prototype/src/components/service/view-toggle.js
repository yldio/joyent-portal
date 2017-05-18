import React from 'react';
import styled from 'styled-components';

import Toggle from '@ui/components/toggle';
import { remcalc } from '@ui/shared/functions';

const StyledWrapper = styled.div`
  margin-top: ${remcalc(9)};
  margin-bottom: ${remcalc(36)};
`;

const StyledSpan = styled.span`
  margin-right: ${remcalc(6)};
`;

const ServiceToggle = () => (
  <StyledWrapper>
    <StyledSpan>View</StyledSpan>
    <Toggle />
  </StyledWrapper>
);

export default ServiceToggle;
