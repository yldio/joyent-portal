const React = require('react');
const composers = require('../../shared/composers');
const Styled = require('styled-components');

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

const GraphNodeMetrics = ({
  connected,
  metrics,
  metricsPosition
}) => {

  const metricSpacing = 18;
  const metricsText = metrics.map((metric, index) => (
    <StyledText
      key={index}
      x={0}
      y={12 + metricSpacing*index}
      connected={connected}
    >
      {`${metric.name}: ${metric.value}`}
    </StyledText>
  ));

  return (
    <g transform={`translate(${metricsPosition.x}, ${metricsPosition.y})`}>
      {metricsText}
    </g>
  );
};

GraphNodeMetrics.propTypes = {
  connected: React.PropTypes.bool,
  metrics: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    stat: React.PropTypes.string
  })),
  metricsPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  })
};

module.exports = Baseline(
  GraphNodeMetrics
);
