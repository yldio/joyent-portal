const constantCase = require('constant-case');
const ReduxActions = require('redux-actions');

const {
  createAction
} = ReduxActions;

const APP = constantCase(process.env['APP_NAME']);

const projectMemberActions = {
  projecthandleInviteToggle:
    createAction(`${APP}/PROJECT_HANDLE_INVITE_MEMBER_TOGGLE`),
  projecthandlePeopleStatusTooltip:
    createAction(`${APP}/PROJECT_HANDLE_PERSON_STATUS_TOOLTIP`),
  projecthandlePeopleRoleTooltip:
    createAction(`${APP}/PROJECT_HANDLE_PERSON_ROLE_TOOLTIP`),
  projecthandleMemberUpdate:
    createAction(`${APP}/PROJECT_HANDLE_MEMBER_UPDATE`),
  projectremoveMember:
    createAction(`${APP}/PROJECT_REMOVE_MEMBER_FROM_ROLE`),
};

const orgMemberActions = {
  handleInviteToggle:
    createAction(`${APP}/HANDLE_INVITE_MEMBER_TOGGLE`),
  handlePeopleStatusTooltip:
    createAction(`${APP}/HANDLE_PERSON_STATUS_TOOLTIP`),
  handlePeopleRoleTooltip:
    createAction(`${APP}/HANDLE_PERSON_ROLE_TOOLTIP`),
  handleMemberUpdate:
    createAction(`${APP}/HANDLE_MEMBER_UPDATE`),
  removeMember:
    createAction(`${APP}/REMOVE_MEMBER_FROM_ROLE`),
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
  ...orgMemberActions,
  ...projectMemberActions,
};
