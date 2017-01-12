const constantCase = require('constant-case');
const ReduxActions = require('redux-actions');

const {
  createAction
} = ReduxActions;

const APP = constantCase(process.env['APP_NAME']);

module.exports = {
  ...require('@state/thunks'),
  updateRouter: createAction(`${APP}/APP/UPDATE_ROUTER`),
  toggleHeaderTooltip: createAction(`${APP}/APP/TOGGLE_HEADER_TOOLTIP`),
  toggleServiceCollapsed: createAction(`${APP}/APP/TOGGLE_SERVICE_COLLAPSED`),
  addMetric: createAction(`${APP}/APP/ADD_METRIC`)
};
