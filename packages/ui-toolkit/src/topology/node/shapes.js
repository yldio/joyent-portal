import styled from 'styled-components';
import is, {isNot} from 'styled-is';
import typography from '../../typography';

export const GraphLine = styled.line`
  stroke: ${props => props.theme.secondaryActive};
  stroke-width: 1.5;

  ${is('consul')`
    stroke: ${props => props.theme.grey};
  `};

  ${isNot('active')`
    stroke: ${props => props.theme.grey};
  `};
`;

export const GraphNodeRect = styled.rect`
  stroke: ${props => props.theme.secondaryActive};
  fill: ${props => props.theme.secondary};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;

  ${is('consul')`
    stroke: ${props => props.theme.grey};
    fill: ${props => props.theme.white};
  `};

  ${isNot('active')`
    stroke: ${props => props.theme.grey};
    fill: ${props => props.theme.whiteActive};
  `};

  ${is('connected')`
    cursor: move;
  `};
`;

export const GraphShadowRect = styled.rect`
  fill: ${props => props.theme.secondary};
  opacity: 0.33;
  rx: 4;
  ry: 4;

  ${is('consul')`
    fill: ${props => props.theme.grey};
  `};
`;

export const GraphTitle = styled.text`
  ${typography.fontFamily};
  ${typography.normal};

  fill: ${props => props.theme.white};
  font-size: 16px;
  font-weight: 600;

  ${is('consul')`
    fill: ${props => props.theme.secondary};
  `};

  ${isNot('active')`
    fill: ${props => props.theme.secondary};
  `};

  cursor: pointer;
`;

export const GraphSubtitle = styled.text`
  ${typography.fontFamily};
  ${typography.normal};

  fill: ${props => props.theme.white};
  font-size: 12px;
  font-weight: 600;

  ${is('consul')`
    fill: ${props => props.theme.secondary};
  `};

  ${isNot('active')`
    fill: ${props => props.theme.secondary};
  `};
`;

export const GraphText = styled.text`
  ${typography.fontFamily};
  ${typography.normal};
  fill: ${props => props.theme.white};

  font-size: 12px;
  opacity: 0.8;

  ${is('consul')`
    fill: ${props => props.theme.secondary};
  `};

  ${isNot('active')`
    fill: ${props => props.theme.secondary};
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
  fill: ${props => props.theme.white};

  ${is('consul')`
    fill: ${props => props.theme.secondary};
  `};

  ${isNot('active')`
    fill: ${props => props.theme.secondary};
  `};
`;

export const GraphHealthyCircle = styled.circle`
  fill: ${props => props.theme.green};
`;
