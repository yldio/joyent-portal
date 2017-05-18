import React from 'react';
import { Baseline } from '../../../shared/composers';
import PropTypes from '../prop-types';
import { GraphText } from './shapes';

const GraphNodeMetrics = ({
  connected,
  metrics,
  pos
}) => {

  const {
    x,
    y
  } = pos;

  const metricSpacing = 18;
  const metricsText = metrics.map((metric, index) => (
    <GraphText
      key={index}
      x={0}
      y={12 + metricSpacing*index}
      connected={connected}
    >
      {`${metric.name}: ${metric.value}`}
    </GraphText>
  ));

  return (
    <g transform={`translate(${x}, ${y})`}>
      {metricsText}
    </g>
  );
};

GraphNodeMetrics.propTypes = {
  connected: React.PropTypes.bool,
  metrics: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  })),
  pos: PropTypes.Point.isRequired
};

export default Baseline(
  GraphNodeMetrics
);
