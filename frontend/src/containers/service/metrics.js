const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('@root/prop-types');
const selectors = require('@state/selectors');
const AddMetrics = require('../metrics/add-metrics');
const actions = require('@state/actions');

const {
  connect
} = ReactRedux;

const {
  metricsByServiceIdSelector,
  serviceByIdSelector
} = selectors;

const {
  addMetric
} = actions;

const Metrics = ({
  addMetric,
  metrics,
  metricTypes,
  service
}) => {

  const onAddMetric = (metric) => {
    addMetric({
      id: metric,
      service: service.uuid
    });
  };

  return (
    <div>
      <p>metrics</p>
      <div>
        <AddMetrics
          metricTypes={metricTypes}
          metrics={metrics}
          onAddMetric={onAddMetric}
        />
      </div>
    </div>
  );
};

Metrics.propTypes = {
  addMetric: React.PropTypes.func.isRequired,
  metricTypes: PropTypes.metricTypes,
  metrics: React.PropTypes.arrayOf(PropTypes.metric),
  service: PropTypes.service
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  metrics: metricsByServiceIdSelector(params.serviceId)(state),
  metricTypes: state.metrics.ui.types,
  service: serviceByIdSelector(params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMetric: (payload) => dispatch(addMetric(payload))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
