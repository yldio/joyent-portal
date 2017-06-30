import React from 'react';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import Constants from '../constants';
import { GraphLine, GraphSubtitle, GraphText } from './shapes';
import GraphNodeInfo from './info';
import GraphNodeMetrics from './metrics';

const GraphNodeContent = ({ connected, child = false, data, index = 0 }) => {
  let { x, y, width, height } = Constants.contentRect;
  if(child) height = Constants.childContentSize.height;

  const contentY = y + height * index;

  // const offset = index ? 18 : -6;

  const nodeInfoPos = child
    ? {
        x: Constants.infoPosition.x,
        y: Constants.infoPosition.y + 21 // offset
      }
    : Constants.infoPosition;

  /* const nodeMetricsPos = child
    ? {
        x: Constants.metricsPosition.x,
        y: Constants.metricsPosition.y + offset
      }
    : Constants.metricsPosition; */

  const nodeSubtitle = child
    ? <GraphSubtitle {...Constants.subtitlePosition} connected={connected}>
        {data.name}
      </GraphSubtitle>
    : null;

  /* const nodeInfo = !child || index
    ? <GraphNodeInfo
        datacenter={data.datacenter}
        instances={data.instances}
        healthy
        connected={connected}
        pos={nodeInfoPos}
      />
     : null; */

  const nodeInfo =
    <GraphNodeInfo
      datacenter={data.datacenter}
      instances={data.instances}
      instanceStatuses={data.instanceStatuses}
      healthy
      connected={connected}
      pos={nodeInfoPos}
    />;

  return (
    <g transform={`translate(${x}, ${contentY})`}>
      <GraphLine x1={0} y1={0} x2={width} y2={0} connected={connected} />
      {nodeSubtitle}
      {nodeInfo}
      {/* <GraphNodeMetrics
        metrics={data.metrics}
        connected={connected}
        pos={nodeMetricsPos}
      /> */}
    </g>
  );
};

GraphNodeContent.propTypes = {
  child: PropTypes.bool,
  connected: PropTypes.bool,
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default Baseline(GraphNodeContent);
