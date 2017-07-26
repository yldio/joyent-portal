import React from 'react';
import styled, { keyframes } from 'styled-components';

const animationName = keyframes`
  0% {
    opacity: 1;
    stroke-width: 2;
  }
  100% {
    opacity: 0.25;
    stroke-width: 0;
  }
`;

const StyledFirstRect = styled.rect`
  fill: ${props => props.theme.primary};
  stroke: ${props => props.theme.primary};
  animation: ${animationName} 1.5s ease-out 0s infinite;
`;

const StyledSecondRect = StyledFirstRect.extend`
  animation-delay: 0.5s;
`;

const StyledThirdRect = StyledFirstRect.extend`
  animation-delay: 1s;
`;

export default () =>
  <svg width="28" height="10">
    <StyledFirstRect x="2" y="2" width="6" height="6" />
    <StyledSecondRect x="11" y="2" width="6" height="6" />
    <StyledThirdRect x="20" y="2" width="6" height="6" />
  </svg>;
