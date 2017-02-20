import React from 'react';
import { Baseline } from '../../shared/composers';
import DataCentresIcon from './icon-data-centers.svg';
import InstancesIcon from './icon-instances.svg';
import styled from 'styled-components';

const StyledText = styled.text`
  fill: ${props => props.connected ? '#ffffff' : '#464646'};
  font-size: 12px;
  opacity: 0.8;
`;

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${props => props.connected ? '#ffffff' : '#464646'};
`;

const StyledDataCentresIcon = styled(DataCentresIcon)`
  fill: ${props => props.connected ? '#ffffff' : '#464646'};
`;

const GraphNodeInfo = ({
  connected,
  datacentres,
  instances,
  healthy,
  infoPosition
}) => {

  return (
    <g transform={`translate(${infoPosition.x}, ${infoPosition.y})`}>
      <g transform={'translate(0, 2)'}>
        <StyledInstancesIcon connected={connected} />
      </g>
      <StyledText
        x={23}
        y={12}
        connected={connected}
      >
        {`${datacentres} inst.`}
      </StyledText>
      <g transform={'translate(82, 0)'}>
        <StyledDataCentresIcon connected={connected} />
      </g>
      <StyledText
        x={96}
        y={12}
        connected={connected}
      >
        {`${instances} DCs`}
      </StyledText>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  connected: React.PropTypes.bool,
  datacentres: React.PropTypes.number,
  healthy: React.PropTypes.bool,
  infoPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  instances: React.PropTypes.number
};

export default Baseline(
  GraphNodeInfo
);
