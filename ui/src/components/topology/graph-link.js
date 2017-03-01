import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import PropTypes from './prop-types';
import React from 'react';

const StyledLine = styled.line`
  stroke: ${colors.base.secondaryActive};
  stroke-width: 1.5;
`;

const StyledCircle = styled.circle`
  stroke: ${colors.base.secondaryActive};
  fill: ${colors.base.secondary};
  stroke-width: 1.5;
`;

const StyledArrow = styled.line`
  stroke: ${colors.base.white};
  stroke-width: 2;
  stroke-linecap: round;
`;

const getAngleFromPoints = (source, target) => {

  const lineAngle = Math.atan2(target.y-source.y, target.x - source.x);
  const lineAngleDeg = lineAngle*180/Math.PI;
  const zeroToThreeSixty = lineAngleDeg < 0 ? 360 + lineAngleDeg : lineAngleDeg;

  return zeroToThreeSixty;
};

const getPosition = (angle, positions, position, noCorners=false) => {
  const positionIndex = noCorners ?
    Math.round(angle/90)*2 : Math.round(angle/45);
  const offsetPosition = positions[positionIndex];
  return {
    id: offsetPosition.id,
    x: position.x + offsetPosition.x,
    y: position.y + offsetPosition.y
  };
};

const getPositions = (halfWidth, halfHeight, halfCorner=0) => ([{
  id: 'r',
  x: halfWidth,
  y: 0
}, {
  id: 'br',
  x: halfWidth - halfCorner,
  y: halfHeight - halfCorner
}, {
  id: 'b',
  x: 0,
  y: halfHeight
}, {
  id: 'bl',
  x: -halfWidth + halfCorner,
  y: halfHeight - halfCorner
}, {
  id: 'l',
  x: -halfWidth,
  y: 0
}, {
  id: 'tl',
  x: -halfWidth + halfCorner,
  y: -halfHeight + halfCorner
}, {
  id: 't',
  x: 0,
  y: -halfHeight
}, {
  id: 'tr',
  x: halfWidth - halfCorner,
  y: -halfHeight + halfCorner
},{
  id: 'r',
  x: halfWidth,
  y: 0
}]);

const GraphLink = ({
  data,
  index,
  nodeSize
}) => {

  const {
    source,
    target
  } = data;

  // actually, this will need to be got dynamically, in case them things are different sizes
  const {
    width,
    height
  } = nodeSize;

  const halfWidth = width/2;
  const halfHeight = height/2;
  const halfCorner = 2;

  const positions = getPositions(halfWidth, halfHeight, halfCorner);
  const sourceAngle = getAngleFromPoints(source, target);
  const sourcePosition = getPosition(sourceAngle, positions, source);
  const targetAngle = getAngleFromPoints(target, source);
  const targetPosition = getPosition(targetAngle, positions, target); //, true);
  const arrowAngle = getAngleFromPoints(sourcePosition, targetPosition);

  return (
    <g>
      <StyledLine
        x1={sourcePosition.x}
        x2={targetPosition.x}
        y1={sourcePosition.y}
        y2={targetPosition.y}
      />
      <g
        transform={
          // eslint-disable-next-line max-len
          `translate(${targetPosition.x}, ${targetPosition.y}) rotate(${arrowAngle})`
        }
      >
        <StyledCircle
          cx={0}
          cy={0}
          r={9}
        />
        <StyledArrow
          x1={-1}
          x2={2}
          y1={-3}
          y2={0}
        />
        <StyledArrow
          x1={-1}
          x2={2}
          y1={3}
          y2={0}
        />
      </g>
    </g>
  );
};

GraphLink.propTypes = {
  data: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  nodeSize: PropTypes.Size
};

export default Baseline(
  GraphLink
);
