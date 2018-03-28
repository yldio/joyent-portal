import React from 'react';
import styled, { keyframes } from 'styled-components';
import is from 'styled-is';

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

  ${is('secondary')`
    fill: ${props => props.theme.white};
    stroke: ${props => props.theme.white};
  `};

  ${is('tertiary')`
    fill: ${props => props.theme.secondary};
    stroke: ${props => props.theme.secondary};
  `};

  animation: ${animationName} 1.5s ease-out 0s infinite;
`;

const StyledSecondRect = styled(StyledFirstRect)`
  /* trick prettier */
  animation-delay: 0.5s;
`;

const StyledThirdRect = styled(StyledFirstRect)`
  /* trick prettier */
  animation-delay: 1s;
`;

export default ({ secondary, tertiary }) => (
  <svg width="28" height="10">
    <StyledFirstRect
      tertiary={tertiary}
      secondary={secondary}
      x="2"
      y="2"
      width="6"
      height="6"
    />
    <StyledSecondRect
      tertiary={tertiary}
      secondary={secondary}
      x="11"
      y="2"
      width="6"
      height="6"
    />
    <StyledThirdRect
      tertiary={tertiary}
      secondary={secondary}
      x="20"
      y="2"
      width="6"
      height="6"
    />
  </svg>
);
