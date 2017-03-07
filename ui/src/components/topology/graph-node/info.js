import React from 'react';
import styled from 'styled-components';
import { Baseline } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import DataCentresIcon from './icon-data-centers.svg';
import InstancesIcon from './icon-instances.svg';
import PropTypes from '../prop-types';
import { GraphText } from './shapes';

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
`;

const StyledDataCentresIcon = styled(DataCentresIcon)`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
`;

const GraphNodeInfo = ({
  connected,
  datacentres,
  instances,
  healthy,
  pos
}) => {

  const {
    x,
    y
  } = pos;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={'translate(0, 2)'}>
        <StyledInstancesIcon connected={connected} />
      </g>
      <GraphText
        x={23}
        y={12}
        connected={connected}
      >
        {`${instances} inst.`}
      </GraphText>
      <g transform={'translate(82, 0)'}>
        <StyledDataCentresIcon connected={connected} />
      </g>
      <GraphText
        x={96}
        y={12}
        connected={connected}
      >
        {`${datacentres} DCs`}
      </GraphText>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  connected: React.PropTypes.bool,
  datacentres: React.PropTypes.number,
  healthy: React.PropTypes.bool,
  instances: React.PropTypes.number,
  pos: PropTypes.Point.isRequired
};

export default Baseline(
  GraphNodeInfo
);
