const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  handleInviteToggle
} = actions;

module.exports = handleActions({
  [handleInviteToggle.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        invite_toggled: !state.ui.invite_toggled
      }
    };
  }
}, {});
