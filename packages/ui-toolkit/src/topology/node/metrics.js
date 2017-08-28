import React from 'react';
import Baseline from '../../baseline';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import PropTypes from 'prop-types';

const GraphNodeMetrics = ({ connected, metrics, pos }) => {
  const { x, y } = pos;

  const metricSpacing = 18;
  const metricsText = metrics.map((metric, index) => (
    <GraphText
      key={index}
      x={0}
      y={12 + metricSpacing * index}
      connected={connected}
    >
      {`${metric.name}: ${metric.value}`}
    </GraphText>
  ));

  return <g transform={`translate(${x}, ${y})`}>{metricsText}</g>;
};

GraphNodeMetrics.propTypes = {
  connected: PropTypes.bool,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  pos: Point.isRequired
};

export default Baseline(GraphNodeMetrics);
