const constantCase = require('constant-case');
const ReduxActions = require('redux-actions');

const {
  createAction
} = ReduxActions;

const APP = constantCase(process.env['APP_NAME']);

module.exports = {
  ...require('@state/thunks'),
  updateRouter: createAction(`${APP}/UPDATE_ROUTER`),
  toggleHeaderTooltip: createAction(`${APP}/TOGGLE_HEADER_TOOLTIP`),
  toggleServiceCollapsed: createAction(`${APP}/TOGGLE_SERVICE_COLLAPSED`),
  addMetric: createAction(`${APP}/ADD_METRIC`),
  toggleInstanceCollapsed: createAction(`${APP}/TOGGLE_INSTANCE_COLLAPSED`),
  toggleMonitorView: createAction(`${APP}/TOGGLE_MONITOR_VIEW`),
  switchMonitorViewPage: createAction(`${APP}/SWITCH_MONITOR_VIEW_PAGE`),
  handleInviteToggle: createAction(`${APP}/HANDLE_INVITE_MEMBER_TOGGLE`),
  handlePeopleStatusTooltip:
      createAction(`${APP}/HANDLE_PERSON_STATUS_TOOLTIP`),
  handlePeopleRoleTooltip:
    createAction(`${APP}/HANDLE_PERSON_ROLE_TOOLTIP`),
  handleRoleUpdate: createAction(`${APP}/HANDLE_PERSON_ROLE_UPDATE`),
};
