import { handleActions } from 'redux-actions';
import {
  addMetric,
  toggleServiceCollapsed,
  toggleTooltip
} from '@state/actions';
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
  }),
  [toggleTooltip.toString()]: (state, action) => {
    const {
      position,
      service
    } = action.payload;

    const show = state.ui.tooltip.service !== service;

    const tooltip = show ? {
      show: true,
      position: {
        ...position
      },
      service: service
    } : {
      show: false
    };

    return {
      ...state,
      ui: {
        ...state.ui,
        tooltip: tooltip
      }
    };
  }
}, {});
