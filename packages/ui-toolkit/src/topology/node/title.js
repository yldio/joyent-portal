import React from 'react';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import Constants from '../constants';
import { GraphTitle, GraphHealthyCircle } from './shapes';
import HeartIcon from './icon-heart.svg';

const GraphNodeTitle = ({ connected, data, onNodeTitleClick }) =>
  <g>
    <GraphTitle
      x={Constants.paddingLeft}
      y={30}
      connected={connected}
      onClick={onNodeTitleClick}
      onKeyDown={onNodeTitleClick}
    >
      {data.name}
    </GraphTitle>
    {/* <g transform={`translate(${115}, ${15})`}>
      <GraphHealthyCircle cx={9} cy={9} r={9} />
      <HeartIcon />
    </g> */}
  </g>;

GraphNodeTitle.propTypes = {
  connected: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onNodeTitleClick: PropTypes.func
};

export default Baseline(GraphNodeTitle);
