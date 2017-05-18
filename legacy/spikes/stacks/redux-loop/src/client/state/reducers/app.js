const ReduxActions = require('redux-actions');
const actions = require('../actions');

const {
  handleActions
} = ReduxActions;

const {
  UPDATE_ROUTER
} = actions;

exports.ui = handleActions({
  [UPDATE_ROUTER]: (state, action) => {
    return {
      ...state,
      router: action.payload
    };
  }
}, {});
