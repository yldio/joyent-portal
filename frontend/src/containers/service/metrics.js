const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const Metrics = require('@containers/metrics');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  metricsByServiceIdSelector,
  metricTypesSelector,
  serviceByIdSelector
} = selectors;

const {
  addMetric,
  metricDurationChange
} = actions;

const mapStateToProps = (state, {
  params = {}
}) => ({
  datasets: metricsByServiceIdSelector(params.serviceId)(state),
  metricTypes: metricTypesSelector(state),
  service: serviceByIdSelector(params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMetric: (service) => (metric) => dispatch(addMetric({
    metric: metric,
    service: service.uuid
  })),
  metricDurationChange: (service) =>
    (duration, dataset) => dispatch(metricDurationChange({
      duration,
      dataset
    }))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  addMetric: dispatchProps.addMetric(stateProps.service),
  metricDurationChange: dispatchProps.metricDurationChange(stateProps.service)
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Metrics);
