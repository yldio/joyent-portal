const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  handleInviteToggle,
  handlePeopleRoleTooltip,
  handlePeopleStatusTooltip,
  handleRoleUpdate,
  handleStatusUpdate,
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
    const {
      orgIndex,
      person,
      personIndex,
    } = action.payload;

    return {
      ...state,
      ui: {
        ...state.ui,
        member_role_tooltip: false
      },
      data: [
        ...state.data.slice(0, orgIndex),
        {
          ...state.data[orgIndex],
          members: [
            ...state.data[orgIndex].members.slice(0, personIndex),
            {
              ...person,
            },
            ...state.data[orgIndex].members.slice(personIndex + 1)
          ]
        },
        ...state.data.slice(orgIndex + 1),
      ]
    };
  },
  [handleStatusUpdate.toString()]: (state, action) => {
    const {
      orgIndex,
      person,
      personIndex,
    } = action.payload;

    return {
      ...state,
      ui: {
        ...state.ui,
        member_status_tooltip: false,
        member_role_tooltip: false
      },
      data: [
        ...state.data.slice(0, orgIndex),
        {
          ...state.data[orgIndex],
          members: [
            ...state.data[orgIndex].members.slice(0, personIndex),
            {
              ...person,
            },
            ...state.data[orgIndex].members.slice(personIndex + 1)
          ]
        },
        ...state.data.slice(orgIndex + 1),
      ]
    };
  }
}, {});
