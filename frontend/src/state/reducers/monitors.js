import { handleActions } from 'redux-actions';
import { toggleMonitorView, switchMonitorViewPage } from '@state/actions';

export default handleActions({
  [toggleMonitorView.toString()]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      active: action.payload
    }
  }),
  [switchMonitorViewPage.toString()]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      page: action.payload
    }
  })
}, {});
