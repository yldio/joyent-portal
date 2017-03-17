import { handleActions } from 'redux-actions';
import { metricDurationChange, refreshMetrics } from '@state/actions';

export default handleActions({
  [metricDurationChange.toString()]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      [action.payload.dataset]: {
        ...state.ui[action.payload.dataset],
        duration: action.payload.duration
      }
    }
  }),
  [refreshMetrics.toString()]: (state) => {

    return ({
      ...state,
      ui: {
        ...state.ui,
        pos: state.ui.pos + 1
      }
    });
  }
}, {});
