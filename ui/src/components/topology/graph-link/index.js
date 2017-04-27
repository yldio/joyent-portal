import { Baseline } from '../../../shared/composers';
import React from 'react';
import {
  GraphLinkLine
} from './shapes';

const GraphLink = ({
  data,
  index
}) => {

  const {
    sourcePosition,
    targetPosition
  } = data;

  return (
    <GraphLinkLine
      x1={sourcePosition.x}
      x2={targetPosition.x}
      y1={sourcePosition.y}
      y2={targetPosition.y}
    />
  );
};

GraphLink.propTypes = {
  data: React.PropTypes.object.isRequired,
  index: React.PropTypes.number
};

export default Baseline(
  GraphLink
);
