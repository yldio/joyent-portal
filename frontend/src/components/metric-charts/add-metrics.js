const React = require('react');
const PropTypes = require('@root/prop-types');
const AddMetric = require('@ui/components/add-metric');
const ReactIntl = require('react-intl');

const {
  FormattedMessage
} = ReactIntl;

const {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
} = AddMetric;

const AddMetrics = ({
  datasets,
  metricTypes,
  onAddMetric
}) => {

  const added = (metric) =>
    Boolean(datasets.filter((dataset) => dataset.type.id === metric).length);
  const addButton = (metric) => (
    <AddMetricButton metric={metric} onClick={onAddMetric}>
      <FormattedMessage id={'metrics.add.add-label'} onClick={onAddMetric} />
    </AddMetricButton>
  );
  const addedButton = (
    <AddMetricButton disabled>
      <FormattedMessage id={'metrics.add.added-label'} />
    </AddMetricButton>
  );

  const metricList = metricTypes.map((metric) => (
    <AddMetricTile key={metric.id}>
      <AddMetricTitle>
        <FormattedMessage id={`metrics.${metric.id}.title`} />
      </AddMetricTitle>
      <AddMetricDescription>
        <FormattedMessage id={`metrics.${metric.id}.description`} />
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>
        <FormattedMessage id={'metrics.add.link-label'} />
      </AddMetricLink>
      { added(metric.id) ? addedButton : addButton(metric.id) }
    </AddMetricTile>
  ));

  return (
    <div>
      {metricList}
    </div>
  );
};

AddMetrics.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset),
  metricTypes: React.PropTypes.arrayOf(PropTypes.metric),
  onAddMetric: React.PropTypes.func.isRequired,
};

module.exports = AddMetrics;
