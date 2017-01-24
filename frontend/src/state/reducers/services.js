const ReduxActions = require('redux-actions');

const actions = require('@state/actions');
const common = require('@state/reducers/common');

const {
  handleActions
} = ReduxActions;

const {
  addMetric,
  toggleServiceCollapsed
} = actions;

const {
  toggleCollapsed
} = common;

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

module.exports = handleActions({
  [toggleServiceCollapsed.toString()]: toggleCollapsed,
  // This will need to be handled by an async action
  // to update on the server too
  [addMetric.toString()]: (state, action) => {
    return ({
      ...state,
      data: getServices(
        state.data,
        action.payload.service,
        action.payload.metric
      )
    });
  }
}, {});
