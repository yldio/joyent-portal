const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  toggleHeaderTooltip
} = actions;

module.exports = handleActions({
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
