const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  toggleServiceCollapsed
} = actions;

module.exports = handleActions({
  [toggleServiceCollapsed.toString()]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      collapsed: state.ui.collapsed.indexOf(action.payload) >= 0
        ? state.ui.collapsed.filter((uuid) => uuid !== action.payload)
        : [...state.ui.collapsed, action.payload]
    }
  })
}, {});
