import { connect } from 'react-redux';
import { addMetric, metricDurationChange } from '@state/actions';
import Metrics from '@containers/metrics';

import {
  metricsByServiceIdSelector,
  metricTypesSelector,
  serviceByIdSelector
} from '@state/selectors';

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  datasets: metricsByServiceIdSelector(match.params.serviceId)(state),
  metricTypes: metricTypesSelector(state),
  service: serviceByIdSelector(match.params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMetric: (service) => (metric) =>
    dispatch(addMetric({
      metric: metric,
      service: service.uuid
    })),
  metricDurationChange: (service) => (duration, dataset) =>
    dispatch(metricDurationChange({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Metrics);
