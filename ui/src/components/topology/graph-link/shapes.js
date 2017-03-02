import styled from 'styled-components';
import { colors } from '../../../shared/constants';

export const GraphLinkLine = styled.line`
  stroke: ${colors.base.secondaryActive};
  stroke-width: 1.5;
`;

export const GraphLinkCircle = styled.circle`
  stroke: ${colors.base.secondaryActive};
  fill: ${colors.base.secondary};
  stroke-width: 1.5;
`;

export const GraphLinkArrow = styled.line`
  stroke: ${colors.base.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
