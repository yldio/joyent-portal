const ReduxActions = require('redux-actions');

const actions = require('@state/actions');
const common = require('@state/reducers/common');

const {
  handleActions
} = ReduxActions;

const {
  toggleServiceCollapsed
} = actions;

const {
  toggleCollapsed
} = common;

module.exports = handleActions({
  [toggleServiceCollapsed.toString()]: toggleCollapsed
}, {});
