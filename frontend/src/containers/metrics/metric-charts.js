const React = require('react');
const moment = require('moment');
const PropTypes = require('@root/prop-types');
const Metric = require('@ui/components/metric');
const ReactIntl = require('react-intl');

const {
  FormattedMessage
} = ReactIntl;

const {
  MetricGraph,
  MetricCloseButton,
  MetricHeader,
  MetricSelect,
  MetricSettingsButton,
  MetricTitle,
  MetricView
} = Metric;

const MetricCharts = ({
  // metricTypes,
  // metrics,
  // onAddMetric,
  datasets,
  duration = 360,
  durations = [
    360,
    720,
    1440,
    2880
  ],
  onDurationChange = () => {},
  onSettingsClick = () => {},
  onRemoveMetric = () => {}
  // and another one here to come...
}) => {

  const optionList = durations.map(duration => (
    <option key={duration} value={duration}>
      {moment.duration(duration, 'minutes').humanize()}
    </option>
  ));

  const metricList = datasets.map((dataset) => {
    // TODO
    // - yMeasurement '%' or not
    // - yMin & yMax should all come from the metric type description

    return (
      <MetricView key={dataset.uuid + Math.random()}>
        <MetricHeader>
          <MetricTitle>{dataset.uuid}</MetricTitle>
          <MetricSelect onChange={onDurationChange} value={durations[0]}>
            {optionList}
          </MetricSelect>
          <MetricSettingsButton onClick={onSettingsClick}>
            <FormattedMessage id={'metrics.metric.settings-label'} />
          </MetricSettingsButton>
          <MetricCloseButton onClick={onRemoveMetric} />
        </MetricHeader>
        <MetricGraph
          data={dataset.data}
          duration={duration}
          yMax={100}
          yMeasurement='%'
          yMin={0}
        />
      </MetricView>
    );
  });

  return (
    <div>
      {metricList}
    </div>
  );
};

MetricCharts.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.Dataset),
  duration: React.PropTypes.number,
  durations: React.PropTypes.arrayOf(React.PropTypes.number),
  onDurationChange: React.PropTypes.func.isRequired,
  onRemoveMetric: React.PropTypes.func.isRequired,
  onSettingsClick: React.PropTypes.func.isRequired
};

module.exports = MetricCharts;
