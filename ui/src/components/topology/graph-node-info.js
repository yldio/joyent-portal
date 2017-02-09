const React = require('react');
const Styled = require('styled-components');
const DataCentresIcon =
  require(
    // eslint-disable-next-line max-len
    '!babel-loader!svg-react-loader!./icon-data-centers.svg?name=DataCentresIcon'
  );
const InstancesIcon =
  require(
    '!babel-loader!svg-react-loader!./icon-instances.svg?name=InstancesIcon'
  );

const {
  default: styled
} = Styled;

const StyledText = styled.text`
  fill: white;
  font-size: 12px;
  opacity: 0.8;
`;

const GraphNodeInfo = ({
  attrs,
  infoPosition
}) => {

  const {
    dcs,
    instances
  } = attrs;

  return (
    <g transform={`translate(${infoPosition.x}, ${infoPosition.y})`}>
      <g transform={'translate(0, 2)'}>
        <InstancesIcon />
      </g>
      <StyledText x={23} y={12}>{`${dcs} inst.`}</StyledText>
      <g transform={'translate(82, 0)'}>
        <DataCentresIcon />
      </g>
      <StyledText x={96} y={12}>{`${instances} DCs`}</StyledText>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  attrs: React.PropTypes.shape({
    dcs: React.PropTypes.number,
    instances: React.PropTypes.number,
    healthy: React.PropTypes.bool
  }),
  infoPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  })
};

module.exports = GraphNodeInfo;
