import styled from 'styled-components';
import { colors } from '../../../shared/constants';

export const GraphLine = styled.line`
  stroke: ${props => props.connected ?
    colors.base.secondaryActive : colors.base.grey};
  stroke-width: 1.5;
`;

export const GraphNodeRect = styled.rect`
  stroke: ${props => props.connected ?
    colors.base.secondaryActive : colors.base.grey};
  fill: ${props => props.connected ? colors.base.secondary : colors.base.white};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;
`;

export const GraphShadowRect = styled.rect`
  fill: ${props => props.connected ? colors.base.secondary : colors.base.grey};
  opacity: 0.33;
  rx: 4;
  ry: 4;
`;

export const GraphTitle = styled.text`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
  font-size: 16px;
  font-weight: 600;
`;

export const GraphSubtitle = styled.text`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
  font-size: 12px;
  font-weight: 600;
`;

export const GraphText = styled.text`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
  font-size: 12px;
  opacity: 0.8;
`;

export const GraphButtonRect = styled.rect`
  opacity: 0;
  cursor: pointer;
`;

export const GraphButtonCircle = styled.circle`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
`;

export const GraphHealthyCircle = styled.circle`
  fill: ${colors.base.green};
`;
