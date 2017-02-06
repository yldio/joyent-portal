const React = require('React');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledLine = styled.line`
  stroke: #343434;
  stroke-width: 1.5;
`;

const StyledCircle = styled.circle`
  stroke: #343434;
  fill: #464646;
  stroke-width: 1.5;
`;

const StyledArrow = styled.line`
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
`;

const getAngleFromPoints = (source, target) => {

  const lineAngle = Math.atan2(target.y-source.y, target.x - source.x);
  const lineAngleDeg = lineAngle*180/Math.PI;
  const zeroToThreeSixty = lineAngleDeg < 0 ? 360 + lineAngleDeg : lineAngleDeg;

  return zeroToThreeSixty;
}

const getPosition = (angle, positions, position, noCorners=false) => {
  const positionIndex = noCorners ?
    Math.round(angle/90)*2 : Math.round(angle/45);
  const offsetPosition = positions[positionIndex];
  return {
    id: offsetPosition.id,
    x: position.x + offsetPosition.x,
    y: position.y + offsetPosition.y
  };
}

class GraphLink extends React.Component {

  render() {
    const {
      data,
      nodeSize,
      index
    } = this.props;

    const {
      source,
      target
    } = data;

    // actually, this will need to be got dynamically, in case them things are different sizes
    const {
      width,
      height
    } = nodeSize;

    const halfWidth = width/2;
    const halfHeight = height/2;
    const halfCorner = 2;

    const positions = getPositions(halfWidth, halfHeight, halfCorner);
    const sourceAngle = getAngleFromPoints(source, target);
    const sourcePosition = getPosition(sourceAngle, positions, source);
    const targetAngle = getAngleFromPoints(target, source);
    const targetPosition = getPosition(targetAngle, positions, target, true);
    const arrowAngle = getAngleFromPoints(sourcePosition, targetPosition);

    return (
      <g>
        <StyledLine x1={sourcePosition.x} x2={targetPosition.x} y1={sourcePosition.y} y2={targetPosition.y} />
        <g transform={`translate(${targetPosition.x}, ${targetPosition.y}) rotate(${arrowAngle})`}>
          <StyledCircle cx={0} cy={0} r={9} />
          <StyledArrow x1={-1} x2={2} y1={-3} y2={0} />
          <StyledArrow x1={-1} x2={2} y1={3} y2={0} />
        </g>
      </g>
    );
  }
}

module.exports = GraphLink;

const getPositions = (halfWidth, halfHeight, halfCorner=0) => ([{
  id: 'r',
  x: halfWidth,
  y: 0
}, {
  id: 'br',
  x: halfWidth - halfCorner,
  y: halfHeight - halfCorner
}, {
  id: 'b',
  x: 0,
  y: halfHeight
}, {
  id: 'bl',
  x: -halfWidth + halfCorner,
  y: halfHeight - halfCorner
}, {
  id: 'l',
  x: -halfWidth,
  y: 0
}, {
  id: 'tl',
  x: -halfWidth + halfCorner,
  y: -halfHeight + halfCorner
}, {
  id: 't',
  x: 0,
  y: -halfHeight
}, {
  id: 'tr',
  x: halfWidth - halfCorner,
  y: -halfHeight + halfCorner
},{
  id: 'r',
  x: halfWidth,
  y: 0
}]);
