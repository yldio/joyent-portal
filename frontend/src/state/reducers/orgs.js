const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  handleInviteToggle,
  handlePeopleRoleTooltip,
  handlePeopleStatusTooltip
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
  },
  [handlePeopleStatusTooltip.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        member_status_tooltip:
          action.payload === state.ui.member_status_tooltip
          ? ''
          : action.payload
      }
    };
  },
  [handlePeopleRoleTooltip.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        member_role_tooltip:
          action.payload === state.ui.member_role_tooltip
          ? ''
          : action.payload
      }
    };
  }
}, {});
