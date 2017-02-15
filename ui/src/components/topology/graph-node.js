const React = require('react');
const Styled = require('styled-components');
const PropTypes = require('./prop-types');
const GraphNodeButton = require('./graph-node-button');
const GraphNodeInfo = require('./graph-node-info');
const GraphNodeMetrics = require('./graph-node-metrics');
const HeartIcon =
  require(
    '!babel-loader!svg-react-loader!./icon-heart.svg?name=HeartIcon'
  );

const {
  default: styled
} = Styled;

const StyledRect = styled.rect`
  stroke: #343434;
  fill: #464646;
  stroke-width: 1.5;
  rx: 4;
  ry: 4;
`;

const StyledShadowRect = styled.rect`
  fill: #464646;
  opacity: 0.33;
  rx: 4;
  ry: 4;
`;

const StyledLine = styled.line`
  stroke: #343434;
  stroke-width: 1.5;
`;

const StyledText = styled.text`
  fill: white;
  font-size: 16px;
  font-weight: 600;
`;

const HeartCircle = styled.circle`
  fill: #00af66;
`;

const GraphNode = ({
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
  const lineY = 48 - halfHeight;
  const lineX = 140 - halfWidth;
  const buttonRect = {
    x: lineX,
    y: -halfHeight,
    width: width - 140,
    height: 48
  };

  const onButtonClick = (evt) => {
    // console.log('Rect clicked!!!');
  };

  const paddingLeft = 18-halfWidth;
  const infoPosition = {
    x: paddingLeft,
    y: 59 - halfHeight,
  };
  const metricsPosition = {
    x: paddingLeft,
    y: 89 - halfHeight
  };

  // const titleBbBox = {x:100, y: 30 - halfHeight};
  const onStart = (evt) => {
    evt.preventDefault();
    onDragStart(evt, data.id);
  };

  return (
    <g
      transform={`translate(${data.x}, ${data.y})`}
      onMouseDown={onStart}
      onTouchStart={onStart}
    >
      <StyledShadowRect
        x={-halfWidth}
        y={3-halfHeight}
        width={width}
        height={height}
      />
      <StyledRect
        x={-halfWidth}
        y={-halfHeight}
        width={width}
        height={height}
      />
      <StyledLine
        x1={-halfWidth}
        y1={lineY}
        x2={halfWidth}
        y2={lineY}
      />
      <StyledLine
        x1={lineX}
        y1={-halfHeight}
        x2={lineX}
        y2={lineY}
      />
      <StyledText x={paddingLeft} y={30 - halfHeight}>{data.id}</StyledText>
      <g transform={`translate(${25}, ${15 - halfHeight})`}>
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
      />
      <GraphNodeInfo
        attrs={data.attrs}
        infoPosition={infoPosition}
      />
      <GraphNodeMetrics
        metrics={data.metrics}
        metricsPosition={metricsPosition}
      />
    </g>
  );
};

GraphNode.propTypes = {
  data: React.PropTypes.object.isRequired,
  onDragStart: React.PropTypes.func,
  size: PropTypes.Size
};

module.exports = GraphNode;
