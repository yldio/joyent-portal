const React = require('react');
const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const AddMetrics = require('./add-metrics');
const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const MetricCharts = require('./metric-charts');
const Monitors = require('./monitors');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');

const {
  connect
} = ReactRedux;

const {
  toggleMonitorView
} = actions;

const Metrics = ({
  addMetric,
  metrics,
  metricTypes,
  metricTypeUuid = '',
  service,
  toggleMonitorView = () => null
}) => {
  const onMonitorsClick = (ev) => toggleMonitorView(metricTypeUuid);

  return (
    <div>
      <Row reverse>
        <Column>
          <Button onClick={onMonitorsClick}>Monitors</Button>
        </Column>
      </Row>
      <Monitors />
      <MetricCharts
        datasets={metrics.datasets}
        onSettingsClick={toggleMonitorView}
      />
      <AddMetrics
        metricTypes={metricTypes}
        metrics={metrics.types}
        onAddMetric={addMetric}
      />
    </div>
  );
};

Metrics.propTypes = {
  addMetric: React.PropTypes.func.isRequired,
  metricTypeUuid: React.PropTypes.string,
  metricTypes: React.PropTypes.arrayOf(React.PropTypes.string),
  metrics: React.PropTypes.arrayOf(PropTypes.metric),
  service: PropTypes.service,
  toggleMonitorView: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  // hardcoded now, but should be dynamic
  // actually, the use for this prop is going to disapear
  metricTypeUuid: 'dca08514-72e5-46ce-ad91-e68b3b0914d4',
});

const mapDispatchToProps = (dispatch) => ({
  toggleMonitorView: (metricTypeUuid) =>
    dispatch(toggleMonitorView(metricTypeUuid))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
