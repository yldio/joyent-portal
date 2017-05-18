import styled from 'styled-components';

export const GraphLinkLine = styled.line`
  stroke: ${props => props.theme.secondaryActive};
  stroke-width: 1.5;
`;

export const GraphLinkCircle = styled.circle`
  stroke: ${props => props.theme.secondaryActive};
  fill: ${props => props.theme.secondary};
  stroke-width: 1.5;
`;

export const GraphLinkArrowLine = styled.line`
  stroke: ${props => props.theme.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
