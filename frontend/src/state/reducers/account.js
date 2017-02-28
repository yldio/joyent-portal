import { handleActions } from 'redux-actions';
import { toggleHeaderTooltip } from '@state/actions';

export default handleActions({
  [toggleHeaderTooltip.toString()]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      tooltip: action.payload
    }
  })
}, {});
