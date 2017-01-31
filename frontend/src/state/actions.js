const constantCase = require('constant-case');
const ReduxActions = require('redux-actions');

const {
  createAction
} = ReduxActions;

const APP = constantCase(process.env['APP_NAME']);

const projectMemberActions = {
  projectHandleInviteToggle:
    createAction(`${APP}/PROJECT_HANDLE_INVITE_MEMBER_TOGGLE`),
  projectHandlePeopleStatusTooltip:
    createAction(`${APP}/PROJECT_HANDLE_PERSON_STATUS_TOOLTIP`),
  projectHandlePeopleRoleTooltip:
    createAction(`${APP}/PROJECT_HANDLE_PERSON_ROLE_TOOLTIP`),
  projectHandleMemberUpdate:
    createAction(`${APP}/PROJECT_HANDLE_MEMBER_UPDATE`),
  projectRemoveMember:
    createAction(`${APP}/PROJECT_REMOVE_MEMBER_FROM_ROLE`),
};

const orgMemberActions = {
  orgHandleInviteToggle:
    createAction(`${APP}/ORG_HANDLE_INVITE_MEMBER_TOGGLE`),
  orgHandlePeopleStatusTooltip:
    createAction(`${APP}/ORG_HANDLE_PERSON_STATUS_TOOLTIP`),
  orgHandlePeopleRoleTooltip:
    createAction(`${APP}/ORG_HANDLE_PERSON_ROLE_TOOLTIP`),
  orgHandleMemberUpdate:
    createAction(`${APP}/ORG_HANDLE_MEMBER_UPDATE`),
  orgRemoveMember:
    createAction(`${APP}/ORG_REMOVE_MEMBER_FROM_ROLE`),
};

module.exports = {
  ...require('@state/thunks'),
  updateRouter: createAction(`${APP}/UPDATE_ROUTER`),
  toggleHeaderTooltip: createAction(`${APP}/TOGGLE_HEADER_TOOLTIP`),
  toggleServiceCollapsed: createAction(`${APP}/TOGGLE_SERVICE_COLLAPSED`),
  addMetric: createAction(`${APP}/ADD_METRIC`),
  metricDurationChange: createAction(`${APP}/METRIC_DURATION_CHANGE`),
  toggleInstanceCollapsed: createAction(`${APP}/TOGGLE_INSTANCE_COLLAPSED`),
  toggleMonitorView: createAction(`${APP}/TOGGLE_MONITOR_VIEW`),
  switchMonitorViewPage: createAction(`${APP}/SWITCH_MONITOR_VIEW_PAGE`),
  handleNewProject: createAction(`${APP}/CREATE_NEW_PROJECT`),
  ...orgMemberActions,
  ...projectMemberActions,
};
