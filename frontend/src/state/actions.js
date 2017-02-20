import constantCase from 'constant-case';
import { createAction } from 'redux-actions';
// import thunks from '@state/thunks';

const APP = constantCase(process.env['APP_NAME']);

/******************************* PROJECT MEMBER *******************************/

export const addMemberToProject =
  createAction(`${APP}/PROJECT_ADD_MEMBER`);
export const projectHandleInviteToggle =
  createAction(`${APP}/PROJECT_HANDLE_INVITE_MEMBER_TOGGLE`);
export const projectHandlePeopleStatusTooltip =
  createAction(`${APP}/PROJECT_HANDLE_PERSON_STATUS_TOOLTIP`);
export const projectHandlePeopleRoleTooltip =
  createAction(`${APP}/PROJECT_HANDLE_PERSON_ROLE_TOOLTIP`);
export const projectHandleMemberUpdate =
  createAction(`${APP}/PROJECT_HANDLE_MEMBER_UPDATE`);
export const projectRemoveMember =
  createAction(`${APP}/PROJECT_REMOVE_MEMBER_FROM_ROLE`);

/********************************* ORG MEMBER *********************************/

export const addMemberToOrg =
  createAction(`${APP}/ORG_ADD_MEMBER`);
export const orgHandleInviteToggle =
  createAction(`${APP}/ORG_HANDLE_INVITE_MEMBER_TOGGLE`);
export const orgHandlePeopleStatusTooltip =
  createAction(`${APP}/ORG_HANDLE_PERSON_STATUS_TOOLTIP`);
export const orgHandlePeopleRoleTooltip =
  createAction(`${APP}/ORG_HANDLE_PERSON_ROLE_TOOLTIP`);
export const orgHandleMemberUpdate =
  createAction(`${APP}/ORG_HANDLE_MEMBER_UPDATE`);
export const orgRemoveMember =
  createAction(`${APP}/ORG_REMOVE_MEMBER_FROM_ROLE`);

/*********************************** OTHER ***********************************/

export const updateRouter =
  createAction(`${APP}/UPDATE_ROUTER`);
export const toggleHeaderTooltip =
  createAction(`${APP}/TOGGLE_HEADER_TOOLTIP`);
export const toggleServiceCollapsed =
  createAction(`${APP}/TOGGLE_SERVICE_COLLAPSED`);
export const addMetric =
  createAction(`${APP}/ADD_METRIC`);
export const metricDurationChange =
  createAction(`${APP}/METRIC_DURATION_CHANGE`);
export const toggleInstanceCollapsed =
  createAction(`${APP}/TOGGLE_INSTANCE_COLLAPSED`);
export const toggleMonitorView =
  createAction(`${APP}/TOGGLE_MONITOR_VIEW`);
export const switchMonitorViewPage =
  createAction(`${APP}/SWITCH_MONITOR_VIEW_PAGE`);
export const handleNewProject =
  createAction(`${APP}/CREATE_NEW_PROJECT`);
