import React from 'react';
import { Baseline } from '../../../shared/composers';
import Constants from '../constants';
import { GraphTitle, GraphHealthyCircle } from './shapes';
import HeartIcon from './icon-heart.svg';

const GraphNodeTitle = ({
  connected,
  data
}) => {

  return (
    <g>
      <GraphTitle
        x={Constants.paddingLeft}
        y={30}
        connected={connected}
      >
        {data.name}
      </GraphTitle>
      <g transform={`translate(${115}, ${15})`}>
        <GraphHealthyCircle
          cx={9}
          cy={9}
          r={9}
        />
        <HeartIcon />
      </g>
    </g>
  );
};

GraphNodeTitle.propTypes = {
  connected: React.PropTypes.bool,
  data: React.PropTypes.object.isRequired
};

export default Baseline(
  GraphNodeTitle
);
