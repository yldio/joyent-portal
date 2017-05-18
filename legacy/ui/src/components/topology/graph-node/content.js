import React from 'react';
import { Baseline } from '../../../shared/composers';
import Constants from '../constants';
import { GraphLine, GraphSubtitle } from './shapes';
import GraphNodeInfo from './info';
import GraphNodeMetrics from './metrics';

const GraphNodeContent = ({
  connected,
  child=false,
  data,
  index=0
}) => {

  const {
    x,
    y,
    width,
    height
  } = Constants.contentRect;

  const contentY = y + height*index;

  const offset = index ? 18 : - 6;

  const nodeInfoPos = child ? {
    x: Constants.infoPosition.x,
    y: Constants.infoPosition.y + offset
  } : Constants.infoPosition;

  const nodeMetricsPos = child ? {
    x: Constants.metricsPosition.x,
    y: Constants.metricsPosition.y + offset
  } : Constants.metricsPosition;

  const nodeSubtitle = child ? (
    <GraphSubtitle
      {...Constants.subtitlePosition}
      connected={connected}
    >
      {data.name}
    </GraphSubtitle>
  ) : null;

  const nodeInfo = !child || index ? (
    <GraphNodeInfo
      datacenter={data.datacenter}
      instances={data.instances}
      healthy
      connected={connected}
      pos={nodeInfoPos}
    />
  ) : null;

  return (
    <g transform={`translate(${x}, ${contentY})`}>
      <GraphLine
        x1={0}
        y1={0}
        x2={width}
        y2={0}
        connected={connected}
      />
      {nodeSubtitle}
      {nodeInfo}
      <GraphNodeMetrics
        metrics={data.metrics}
        connected={connected}
        pos={nodeMetricsPos}
      />
    </g>
  );
};

GraphNodeContent.propTypes = {
  child: React.PropTypes.bool,
  connected: React.PropTypes.bool,
  data: React.PropTypes.object.isRequired,
  index: React.PropTypes.number
};

export default Baseline(
  GraphNodeContent
);
