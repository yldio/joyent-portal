const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  toggleMonitorView,
  switchMonitorViewPage
  // createMonitor
} = actions;

module.exports = handleActions({
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
