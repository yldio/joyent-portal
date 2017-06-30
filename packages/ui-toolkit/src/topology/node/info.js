import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import DataCentresIcon from './icon-data-centers.svg';
import InstancesIcon from './icon-instances.svg';
import { Point } from '../prop-types';
import { GraphText, GraphHealthyCircle } from './shapes';
import HeartIcon from './icon-heart.svg';

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${props => props.theme.secondary};

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
`;

const StyledDataCentresIcon = styled(DataCentresIcon)`
  fill: ${props => props.theme.secondary};

  ${is('connected')`
    fill: ${props => props.theme.white};
  `};
`;

const GraphNodeInfo = ({ connected, datacenter, instances, instanceStatuses, healthy, pos }) => {
  const { x, y } = pos;

  const statuses = instanceStatuses.map((instanceStatus, index) =>
    <GraphText key={index} connected={connected}>
      {`${instanceStatus.count}
        ${instanceStatus.status.toLowerCase()}`}
    </GraphText>
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`translate(0, 0)`}>
        <GraphHealthyCircle cx={9} cy={9} r={9} />
        <HeartIcon />
      </g>
      <g transform={'translate(30, 4.5)'}>
        <StyledInstancesIcon connected={connected} />
      </g>
      <GraphText x={54} y={14} connected={connected}>
        {`${instances.length} inst.`}
      </GraphText>
      <g transform={'translate(54, 36)'}>
        { statuses }
      </g>
      {/* <g transform={'translate(82, 0)'}>
        <StyledDataCentresIcon connected={connected} />
      </g>
      <GraphText x={96} y={12} connected={connected}>
        {datacenter}
      </GraphText> */}
    </g>
  );
};

GraphNodeInfo.propTypes = {
  connected: PropTypes.bool,
  datacenter: PropTypes.string,
  healthy: PropTypes.bool,
  instances: PropTypes.array,
  instanceStatuses: PropTypes.array,
  pos: Point.isRequired
};

export default Baseline(GraphNodeInfo);
