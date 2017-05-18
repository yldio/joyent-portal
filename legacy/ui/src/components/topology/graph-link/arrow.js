import { Baseline } from '../../../shared/composers';
import React from 'react';
import {
  GraphLinkCircle,
  GraphLinkArrowLine
} from './shapes';

const GraphLinkArrow = ({
  data,
  index
}) => {

  const {
    targetPosition,
    arrowAngle
  } = data;

  return (
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
      <GraphLinkArrowLine
        x1={-1}
        x2={2}
        y1={-3}
        y2={0}
      />
      <GraphLinkArrowLine
        x1={-1}
        x2={2}
        y1={3}
        y2={0}
      />
    </g>
  );
};

GraphLinkArrow.propTypes = {
  data: React.PropTypes.object.isRequired,
  index: React.PropTypes.number
};

export default Baseline(
  GraphLinkArrow
);
