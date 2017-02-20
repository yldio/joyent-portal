import { handleActions } from 'redux-actions';

import {
  addMemberToOrg,
  orgHandleInviteToggle,
  orgHandlePeopleRoleTooltip,
  orgHandlePeopleStatusTooltip,
  orgHandleMemberUpdate,
  orgRemoveMember
} from '@state/actions';

export default handleActions({
  [addMemberToOrg.toString()]: (state, action) => {
    const {
      parentIndex,
      member
    } = action.payload;

    return {
      ...state,
      data: [
        ...state.data.slice(0, parentIndex),
        {
          ...state.data[parentIndex],
          members: [
            ...state.data[parentIndex].members,
            member
          ]
        },
        ...state.data.slice(parentIndex + 1)
      ]
    };
  },
  [orgHandleInviteToggle.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        invite_toggled: !state.ui.invite_toggled
      }
    };
  },
  [orgHandlePeopleStatusTooltip.toString()]: (state, action) => {
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
  [orgHandlePeopleRoleTooltip.toString()]: (state, action) => {
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
  [orgHandleMemberUpdate.toString()]: (state, action) => {
    const {
      parentIndex,
      person,
      personIndex
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
              ...person
            },
            ...state.data[parentIndex].members.slice(personIndex + 1)
          ]
        },
        ...state.data.slice(parentIndex + 1)
      ]
    };
  },
  [orgRemoveMember.toString()]: (state, action) => {
    const {
      parentIndex,
      personIndex
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
        ...state.data.slice(parentIndex + 1)
      ]
    };
  }
}, {});
