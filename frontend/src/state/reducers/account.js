const ReduxActions = require('redux-actions');

const {
  handleActions
} = ReduxActions;

module.exports = handleActions({
  'x': (state) => state // somehow handleActions needs at least one reducer
}, {});
