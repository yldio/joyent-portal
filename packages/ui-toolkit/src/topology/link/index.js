import React from 'react';
import PropTypes from 'prop-types';
import { GraphLinkLine } from './shapes';
import Baseline from '../../baseline';

const GraphLink = ({ data, index }) => {
  const { sourcePosition, targetPosition } = data;

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
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default Baseline(GraphLink);
