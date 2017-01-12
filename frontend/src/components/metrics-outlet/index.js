const React = require('react');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const List = require('@ui/components/list');
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

const {
  ListItemOutlet
} = List;

const StyledOutlet = styled(ListItemOutlet)`
  padding-left: 0;
  padding-right: 0;
`;

const StyledRow = styled(Row)`
  margin: 0;

  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`;

const MetricsOutlet = (props) => {
  const {
    datasets = []
  } = props;

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
    <StyledOutlet {...props}>
      <StyledRow>
        {_datasets}
      </StyledRow>
    </StyledOutlet>
  );
};

MetricsOutlet.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset)
};

module.exports = MetricsOutlet;
