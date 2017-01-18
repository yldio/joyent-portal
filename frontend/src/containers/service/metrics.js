const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const Metrics = require('@containers/metrics');
const selectors = require('@state/selectors');

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

const mapStateToProps = (state, {
  params = {}
}) => ({
  metrics: metricsByServiceIdSelector(params.serviceId)(state),
  metricTypes: state.metrics.ui.types,
  service: serviceByIdSelector(params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMetric: (service) => (metric) => dispatch(addMetric({
    id: metric,
    service: service
  }))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  addMetric: dispatchProps.addMetric(stateProps.service)
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Metrics);
