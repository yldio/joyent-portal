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
  metricTypes,
  metrics,
  onAddMetric
}) => {

  const added = (metric) =>
    Boolean(metrics.filter((m) => m.id === metric).length);
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
    <AddMetricTile key={metric}>
      <AddMetricTitle>
        <FormattedMessage id={`metrics.${metric}.title`} />
      </AddMetricTitle>
      <AddMetricDescription>
        <FormattedMessage id={`metrics.${metric}.description`} />
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>
        <FormattedMessage id={'metrics.add.link-label'} />
      </AddMetricLink>
      { added(metric) ? addedButton : addButton(metric) }
    </AddMetricTile>
  ));

  return (
    <div>
      {metricList}
    </div>
  );
};

AddMetrics.propTypes = {
  metricTypes: PropTypes.metricTypes.isRequired,
  metrics: React.PropTypes.arrayOf(PropTypes.metric).isRequired,
  onAddMetric: React.PropTypes.func.isRequired,
};

module.exports = AddMetrics;
