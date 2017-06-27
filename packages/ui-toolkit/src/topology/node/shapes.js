import styled from 'styled-components';
import is from 'styled-is';
import typography from '../../typography';

export const GraphLine = styled.line`
  stroke: ${props => props.theme.grey};
  stroke-width: 1.5;

  ${is('connected')`
    stroke: ${props => props.theme.secondaryActive};
  `};
`;

export const GraphNodeRect = styled.rect`
  stroke: ${props => props.theme.grey};
  fill: ${props => props.theme.white};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;

  ${is('connected')`
    stroke: ${props => props.theme.secondaryActive};
    fill: ${props => props.theme.secondary};
  `};
  cursor: move;
`;

export const GraphShadowRect = styled.rect`
  fill: ${props => props.theme.grey};
  opacity: 0.33;
  rx: 4;
  ry: 4;

  ${is('connected')`
    fill: ${props => props.theme.secondary};
  `};
`;

export const GraphTitle = styled.text`
  ${typography.fontFamily};
  ${typography.normal};

  fill: ${props => props.theme.secondary};
  font-size: 16px;
  font-weight: 600;

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
  cursor: pointer;
`;

export const GraphSubtitle = styled.text`
  ${typography.fontFamily};
  ${typography.normal};

  fill: ${props => props.theme.secondary};
  font-size: 12px;
  font-weight: 600;

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
`;

export const GraphText = styled.text`
  ${typography.fontFamily};
  ${typography.normal};

  fill: ${props => props.theme.secondary};
  font-size: 12px;
  opacity: 0.8;

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
`;

export const GraphButtonRect = styled.rect`
  opacity: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const GraphButtonCircle = styled.circle`
  fill: ${props => props.theme.secondary};

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
`;

export const GraphHealthyCircle = styled.circle`
  fill: ${props => props.theme.green};
`;
