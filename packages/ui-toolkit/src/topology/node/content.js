import React from 'react';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import Constants from '../constants';
import { GraphLine, GraphSubtitle } from './shapes';
import GraphNodeInfo from './info';

const GraphNodeContent = ({
  child = false,
  data,
  y = Constants.contentRect.y,
  index = 0
}) => {
  const { x, width } = Constants.contentRect;

  const nodeInfoPos = child
    ? {
        x: Constants.infoPosition.x,
        y: Constants.infoPosition.y + 21
      }
    : Constants.infoPosition;

  const nodeSubtitle = child
    ? <GraphSubtitle
        {...Constants.subtitlePosition}
        consul={data.isConsul}
        active={data.instancesActive}
      >
        {data.name}
      </GraphSubtitle>
    : null;

  const nodeInfo = <GraphNodeInfo data={data} pos={nodeInfoPos} />;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphLine
        x1={0}
        y1={0}
        x2={width}
        y2={0}
        consul={data.isConsul}
        active={data.instancesActive}
      />
      {nodeSubtitle}
      {nodeInfo}
    </g>
  );
};

GraphNodeContent.propTypes = {
  child: PropTypes.bool,
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default Baseline(GraphNodeContent);
