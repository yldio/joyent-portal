const React = require('react');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const MiniMetric = require('@ui/components/mini-metric');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');

const {
  default: styled
} = Styled;

const {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
} = MiniMetric;

const StyledRow = styled(Row)`
  margin: 0;

  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`;

const MetricsRow = ({
  datasets = []
}) => {
  const _datasets = datasets.map((metric, i) => (
    <Column key={i} xs={4}>
      <MiniMetricView borderless>
        <MiniMetricMeta>
          <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
          <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
        </MiniMetricMeta>
        <MiniMetricGraph data={metric.data} />
      </MiniMetricView>
    </Column>
  ));

  return (
    <StyledRow>
      {_datasets}
    </StyledRow>
  );
};

MetricsRow.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset)
};

module.exports = MetricsRow;
