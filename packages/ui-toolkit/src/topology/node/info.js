import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import InstancesIcon from './icon-instances.svg';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import { HealthyIcon } from '../../icons';

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${props => props.theme.white};

  ${is('consul')`
    fill: ${props => props.theme.secondary};
  `};

  ${isNot('active')`
    fill: ${props => props.theme.secondary};
  `};
`;

// const StyledDataCentresIcon = styled(DataCentresIcon)`
//   fill: ${props => props.theme.white};
//
//   ${is('consul')`
//     fill: ${props => props.theme.secondary};
//   `};
//
//   ${isNot('active')`
//     fill: ${props => props.theme.secondary};
//   `};
// `;

const GraphNodeInfo = ({ data, pos }) => {
  const {
    instances,
    instanceStatuses,
    instancesHealthy,
    isConsul,
    instancesActive,
    transitionalStatus,
    status
  } = data;

  const { x, y } = pos;

  const statuses = transitionalStatus ? (
    <GraphText consul={isConsul} active={instancesActive}>
      {status.toLowerCase()}
    </GraphText>
  ) : (
    instanceStatuses.map((instanceStatus, index) => (
      <GraphText key={index} consul={isConsul} active={instancesActive}>
        {`${instanceStatus.count}
            ${instanceStatus.status.toLowerCase()}`}
      </GraphText>
    ))
  );

  const healthy = (
    <HealthyIcon
      healthy={
        instancesHealthy &&
        instancesHealthy.total === instancesHealthy.healthy ? (
          'HEALTHY'
        ) : (
          'UNHEALTHY'
        )
      }
    />
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`translate(0, 0)`}>{healthy}</g>
      <g transform={'translate(30, 4.5)'}>
        <StyledInstancesIcon consul={isConsul} active={instancesActive} />
      </g>
      <GraphText x={54} y={14} consul={isConsul} active={instancesActive}>
        {`${instances.length} inst.`}
      </GraphText>
      <g transform={'translate(54, 36)'}>{statuses}</g>
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
  data: PropTypes.object.isRequired,
  pos: Point.isRequired
};

export default Baseline(GraphNodeInfo);
