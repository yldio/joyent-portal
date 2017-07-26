import React from 'react';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import Constants from '../constants';
import { GraphTitle } from './shapes';

const GraphNodeTitle = ({ data, onNodeTitleClick }) =>
  <g>
    <GraphTitle
      x={Constants.paddingLeft}
      y={30}
      onClick={onNodeTitleClick}
      onKeyDown={onNodeTitleClick}
      consul={data.isConsul}
      active={data.instancesActive}
    >
      {data.name}
    </GraphTitle>
    {/* <g transform={`translate(${115}, ${15})`}>
      <GraphHealthyCircle cx={9} cy={9} r={9} />
      <HeartIcon />
    </g> */}
  </g>;

GraphNodeTitle.propTypes = {
  data: PropTypes.object.isRequired,
  onNodeTitleClick: PropTypes.func
};

export default Baseline(GraphNodeTitle);
