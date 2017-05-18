import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import DataCentresIcon from './icon-data-centers.svg';
import InstancesIcon from './icon-instances.svg';
import { Point } from '../prop-types';
import { GraphText } from './shapes';

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

const GraphNodeInfo = ({ connected, datacenter, instances, healthy, pos }) => {
  const { x, y } = pos;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={'translate(0, 2)'}>
        <StyledInstancesIcon connected={connected} />
      </g>
      <GraphText x={23} y={12} connected={connected}>
        {`${instances} inst.`}
      </GraphText>
      <g transform={'translate(82, 0)'}>
        <StyledDataCentresIcon connected={connected} />
      </g>
      <GraphText x={96} y={12} connected={connected}>
        {datacenter}
      </GraphText>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  connected: PropTypes.bool,
  datacenter: PropTypes.string,
  healthy: PropTypes.bool,
  instances: PropTypes.number,
  pos: Point.isRequired
};

export default Baseline(GraphNodeInfo);
