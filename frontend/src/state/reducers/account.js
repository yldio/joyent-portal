import { handleActions } from 'redux-actions';
import { toggleHeaderTooltip } from '@state/actions';

export default handleActions({
  [toggleHeaderTooltip.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        tooltip: !state.ui.tooltip
      }
    };
  }
}, {});
