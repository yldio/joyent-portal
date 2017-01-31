const ReduxActions = require('redux-actions');

const actions = require('@state/actions');
const fns = require('@ui/shared/functions');

const {
  handleActions
} = ReduxActions;

const {
  projectHandleInviteToggle,
  projectHandlePeopleRoleTooltip,
  projectHandlePeopleStatusTooltip,
  projectHandleMemberUpdate,
  projectRemoveMember,
  handleNewProject
} = actions;

const {
  rndId
} = fns;

module.exports = handleActions({
  [projectHandleInviteToggle.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        invite_toggled: !state.ui.invite_toggled
      }
    };
  },
  [projectHandlePeopleStatusTooltip.toString()]: (state, action) => {
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
  [projectHandlePeopleRoleTooltip.toString()]: (state, action) => {
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
  [projectHandleMemberUpdate.toString()]: (state, action) => {
    const {
      parentIndex,
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
        ...state.data.slice(0, parentIndex),
        {
          ...state.data[parentIndex],
          members: [
            ...state.data[parentIndex].members.slice(0, personIndex),
            {
              ...person,
            },
            ...state.data[parentIndex].members.slice(personIndex + 1)
          ]
        },
        ...state.data.slice(parentIndex + 1),
      ]
    };
  },
  [projectRemoveMember.toString()]: (state, action) => {
    const {
      parentIndex,
      personIndex,
    } = action.payload;

    return {
      ...state,
      data: [
        ...state.data.slice(0, parentIndex),
        {
          ...state.data[parentIndex],
          members: [
            ...state.data[parentIndex].members.slice(0, personIndex),
            ...state.data[parentIndex].members.slice(personIndex + 1)
          ]
        },
        ...state.data.slice(parentIndex + 1),
      ]
    };
  },
  [handleNewProject.toString()]: (state, action) => {
    const {
      org,
      values
    } = action.payload;
    return {
      ...state,
      data: [
        ...state.data,
        {
          name: values['project-name'],
          org: org.uuid,
          uuid: rndId(),
          id: values['project-name'].toLowerCase().split(' ').join('-')
        }
      ]
    };
  }
}, {});
