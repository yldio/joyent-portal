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
  datasets,
  durations = [
    360,
    720,
    1440,
    2880
  ],
  onDurationChange,
  onSettingsClick,
  onRemoveMetric = () => {}
}) => {

  const optionList = durations.map(duration => (
    <option key={String(duration)} value={duration}>
      {moment.duration(duration, 'minutes').humanize()}
    </option>
  ));

  const metricList = datasets.map((dataset, index) => {

    const {
      data,
      duration=durations[0],
      type
    } = dataset;

    const onSelectChange = (evt) =>
      onDurationChange(Number(evt.target.value), dataset.uuid);

    return (
      <MetricView key={type.id}>
        <MetricHeader>
          <MetricTitle>
            <FormattedMessage id={`metrics.${type.id}.title`} />
          </MetricTitle>
          <MetricSelect onChange={onSelectChange} value={String(duration)}>
            {optionList}
          </MetricSelect>
          <MetricSettingsButton onClick={onSettingsClick}>
            <FormattedMessage id={'metrics.metric.settings-label'} />
          </MetricSettingsButton>
          <MetricCloseButton onClick={onRemoveMetric} />
        </MetricHeader>
        <MetricGraph
          data={data}
          duration={duration}
          yMax={type.max}
          yMeasurement={type.measurement}
          yMin={type.min}
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
  datasets: React.PropTypes.arrayOf(PropTypes.dataset),
  durations: React.PropTypes.arrayOf(React.PropTypes.number),
  onDurationChange: React.PropTypes.func.isRequired,
  onRemoveMetric: React.PropTypes.func.isRequired,
  onSettingsClick: React.PropTypes.func.isRequired
};

module.exports = MetricCharts;
