const React = require('react');
const Styled = require('styled-components');
const GraphNodeButton = require('./graph-node-button');
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
  font-family: LibreFranklin;
  font-size: 16px;
  font-weight: 600;
`;

const StyledInfoText = styled.text`
  fill: white;
  font-family: LibreFranklin;
  font-size: 12px;
`;

class GraphNode extends React.Component {

  render() {
    const {
      data,
      index,
      size
    } = this.props;

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
    }

    const onButtonClick = (evt) => {
      console.log('Rect clicked!!!');
    }

    console.log('data = ', data);
    const paddingLeft = 18-halfWidth;
    const metricsPosition = {
      x: paddingLeft,
      y: 89 - halfHeight
    }

    return (
      <g transform={`translate(${data.x}, ${data.y})`}>
        <StyledShadowRect x={-halfWidth} y={3-halfHeight} width={width} height={height} />
        <StyledRect x={-halfWidth} y={-halfHeight} width={width} height={height} />
        <StyledLine x1={-halfWidth} y1={lineY} x2={halfWidth} y2={lineY} />
        <StyledLine x1={lineX} y1={-halfHeight} x2={lineX} y2={lineY} />
        <StyledText x={paddingLeft} y={30 - halfHeight}>{data.id}</StyledText>
        <HeartIcon />
        <g>
          <path d='M0,10 C-5,-10 18,-10, 20,0 M20,0 C22,-10 45,-10, 40,10 L20,30 L0,10' />
        </g>
        <GraphNodeButton buttonRect={buttonRect} onButtonClick={onButtonClick} />
        <GraphNodeMetrics metrics={data.metrics} metricsPosition={metricsPosition} />
      </g>
    );
  }
}

module.exports = GraphNode;
