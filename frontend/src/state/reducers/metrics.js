import { handleActions } from 'redux-actions';
import { metricDurationChange } from '@state/actions';

export default handleActions({
  [metricDurationChange.toString()]: (state, action) => {
    return ({
      ...state,
      ui: {
        ...state.ui,
        [action.payload.dataset]: {
          ...state.ui[action.payload.dataset],
          duration: action.payload.duration
        }
      }
    });
  }
}, {});
