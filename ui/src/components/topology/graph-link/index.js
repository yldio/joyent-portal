import { Baseline } from '../../../shared/composers';
import Constants from '../constants';
import React from 'react';
import {
  GraphLinkLine,
  GraphLinkCircle,
  GraphLinkArrow
} from './shapes';

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

const getPositions = (rect, halfCorner=0) => ([{
  id: 'r',
  x: rect.right,
  y: 0
}, {
  id: 'br',
  x: rect.right - halfCorner,
  y: rect.bottom - halfCorner
}, {
  id: 'b',
  x: 0,
  y: rect.bottom
}, {
  id: 'bl',
  x: rect.left + halfCorner,
  y: rect.bottom - halfCorner
}, {
  id: 'l',
  x: rect.left,
  y: 0
}, {
  id: 'tl',
  x: rect.left + halfCorner,
  y: rect.top + halfCorner
}, {
  id: 't',
  x: 0,
  y: rect.top
}, {
  id: 'tr',
  x: rect.right- halfCorner,
  y: rect.top + halfCorner
},{
  id: 'r',
  x: rect.right,
  y: 0
}]);

const getRect = (data) => {
  return data.children ?
    Constants.nodeRectWithChildren :
    Constants.nodeRect;
};

const GraphLink = ({
  data,
  index
}) => {

  const {
    source,
    target
  } = data;

  // actually, this will need to be got dynamically, in case them things are different sizes
  // yeah right, now you'll get to do exactly that

  const sourceRect = getRect(source);
  const targetRect= getRect(target);

  const halfCorner = 2;

  const sourcePositions = getPositions(sourceRect, halfCorner);
  const sourceAngle = getAngleFromPoints(source, target);
  const sourcePosition = getPosition(sourceAngle, sourcePositions, source);

  const targetPositions = getPositions(targetRect, halfCorner);
  const targetAngle = getAngleFromPoints(target, sourcePosition);
  const targetPosition = getPosition(targetAngle, targetPositions, target); //, true);

  const arrowAngle = getAngleFromPoints(sourcePosition, targetPosition);

  return (
    <g>
      <GraphLinkLine
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
        <GraphLinkCircle
          cx={0}
          cy={0}
          r={9}
        />
        <GraphLinkArrow
          x1={-1}
          x2={2}
          y1={-3}
          y2={0}
        />
        <GraphLinkArrow
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
  index: React.PropTypes.number.isRequired
};

export default Baseline(
  GraphLink
);
