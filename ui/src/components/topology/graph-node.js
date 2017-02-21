const React = require('react');
const composers = require('../../shared/composers');
const Styled = require('styled-components');
const PropTypes = require('./prop-types');
const GraphNodeButton = require('./graph-node-button');
const GraphNodeInfo = require('./graph-node-info');
const GraphNodeMetrics = require('./graph-node-metrics');

const HeartIcon = require(
  '!babel-loader!svg-react-loader!./icon-heart.svg?name=HeartIcon'
);

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const StyledRect = styled.rect`
  stroke: ${props => props.connected ? '#343434' : '#d8d8d8'};
  fill: ${props => props.connected ? '#464646' : '#ffffff'};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;
`;

const StyledShadowRect = styled.rect`
  fill: ${props => props.connected ? '#464646' : '#d8d8d8'};
  opacity: 0.33;
  rx: 4;
  ry: 4;
`;

const StyledLine = styled.line`
  stroke: ${props => props.connected ? '#343434' : '#d8d8d8'};
  stroke-width: 1.5;
`;

const StyledText = styled.text`
  fill: ${props => props.connected ? '#ffffff' : '#464646'};
  font-size: 16px;
  font-weight: 600;
`;

const HeartCircle = styled.circle`
  fill: #00af66;
`;

const GraphNode = ({
  connected,
  data,
  size,
  onDragStart
}) => {

  const {
    width,
    height
  } = size;

  const halfWidth = width/2;
  const halfHeight = height/2;
  const lineY = 48;
  const lineX = 140;
  const buttonRect = {
    x: lineX,
    y: 0,
    width: 40,
    height: 48
  };

  const onButtonClick = (evt) => {
    // console.log('Rect clicked!!!');
  };

  const paddingLeft = 18;
  const infoPosition = {
    x: paddingLeft,
    y: 59
  };
  const metricsPosition = {
    x: paddingLeft,
    y: 89
  };

  // const titleBbBox = {x:100, y: 30 - halfHeight};
  const onStart = (evt) => {
    evt.preventDefault();
    onDragStart(evt, data.id);
  };

  const position = connected ? {
    x: data.x-halfWidth,
    y: data.y-halfHeight
  } : {
    x: data.x,
    y: data.y
  };

  const nodeRect = connected ? (
    <StyledRect
      x={0}
      y={0}
      width={width}
      height={height}
      onMouseDown={onStart}
      onTouchStart={onStart}
      connected={connected}
    />
  ) : (
    <StyledRect
      x={0}
      y={0}
      width={width}
      height={height}
      connected={connected}
    />
  );

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <StyledShadowRect
        x={0}
        y={3}
        width={width}
        height={height}
        connected={connected}
      />
      {nodeRect}
      <StyledLine
        x1={0}
        y1={lineY}
        x2={width}
        y2={lineY}
        connected={connected}
      />
      <StyledLine
        x1={lineX}
        y1={0}
        x2={lineX}
        y2={lineY}
        connected={connected}
      />
      <StyledText
        x={paddingLeft}
        y={30}
        connected={connected}
      >
        {data.id}
      </StyledText>
      <g transform={`translate(${115}, ${15})`}>
        <HeartCircle
          cx={9}
          cy={9}
          r={9}
        />
        <HeartIcon />
      </g>
      <GraphNodeButton
        buttonRect={buttonRect}
        onButtonClick={onButtonClick}
        connected={connected}
      />
      <GraphNodeInfo
        attrs={data.attrs}
        infoPosition={infoPosition}
        connected={connected}
      />
      <GraphNodeMetrics
        metrics={data.metrics}
        metricsPosition={metricsPosition}
        connected={connected}
      />
    </g>
  );
};

GraphNode.propTypes = {
  connected: React.PropTypes.bool,
  data: React.PropTypes.object.isRequired,
  onDragStart: React.PropTypes.func,
  size: PropTypes.Size
};

module.exports = Baseline(
  GraphNode
);
