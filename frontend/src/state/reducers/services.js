import { handleActions } from 'redux-actions';
import { addMetric, toggleServiceCollapsed } from '@state/actions';
import { toggleCollapsed } from '@state/reducers/common';

const getMetrics = (stateMetrics, addMetric, metric) => {
  const metrics = stateMetrics.map((m) => {
    return ({
      ...m
    });
  });

  if(addMetric) {
    metrics.push({
      type: metric
    });
  }

  return metrics;
};

const getServices = (stateServices, service, metric) => {
  return stateServices.map((s) => {
    return ({
      ...s,
      metrics: getMetrics(
        s.metrics,
        s.uuid === service,
        metric
      )
    });
  });
};

export default handleActions({
  [toggleServiceCollapsed.toString()]: toggleCollapsed,
  // This will need to be handled by an async action
  // to update on the server too
  [addMetric.toString()]: (state, action) => ({
    ...state,
    data: getServices(
      state.data,
      action.payload.service,
      action.payload.metric
    )
  })
}, {});
