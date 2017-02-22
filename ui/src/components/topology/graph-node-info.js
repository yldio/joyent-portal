const React = require('react');
const composers = require('../../shared/composers');
const Styled = require('styled-components');

const DataCentresIcon = require(
  // eslint-disable-next-line max-len
  '!babel-loader!svg-react-loader!./icon-data-centers.svg?name=DataCentresIcon'
);

const InstancesIcon = require(
  '!babel-loader!svg-react-loader!./icon-instances.svg?name=InstancesIcon'
);

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

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

module.exports = Baseline(
  GraphNodeInfo
);
