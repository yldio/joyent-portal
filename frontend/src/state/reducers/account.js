const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  handleToggleAction
} = actions;

module.exports = handleActions({
  [handleToggleAction.toString()]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        'profile_tooltip': !action.payload
      }
    };
  }
}, {});
