const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  handleInviteToggle,
  handlePeopleRoleTooltip,
  handlePeopleStatusTooltip,
  handleRoleUpdate
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
  },
  [handleRoleUpdate.toString()]: (state, action) => {
    // TODO: Change "1" to org index
    return {
      ...state,
      ui: {
        ...state.ui,
        member_role_tooltip: false
      },
      data: [
        ...state.data.slice(0, 1),
        {
          ...state.data[1],
          members: [
            ...state.data[1].members.slice(0, action.payload.personIndex),
            {
              ...action.payload
            },
            ...state.data[1].members.slice(action.payload.personIndex + 1)
          ]
        },
        ...state.data.slice(1+1),
      ]
    };
  }
}, {});
