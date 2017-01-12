const ReduxActions = require('redux-actions');

const actions = require('@state/actions');
const common = require('@state/reducers/common');

const {
  handleActions
} = ReduxActions;

const {
  toggleInstanceCollapsed
} = actions;

const {
  toggleCollapsed
} = common;

module.exports = handleActions({
  [toggleInstanceCollapsed.toString()]: toggleCollapsed
}, {});
