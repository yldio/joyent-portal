const ReduxActions = require('redux-actions');
const app = require('../../../package.json').name;

const {
  createAction,
  handleActions
} = ReduxActions;

const UPDATE_ROUTER = `${app}/changes/UPDATE_ROUTER`;

exports.ui = handleActions({
  [UPDATE_ROUTER]: (state, action) => {
    return {
      ...state,
      router: action.payload
    };
  }
}, {});

const actions = exports.actions = {
  updateRouter: (router) => {
    return {
      type: UPDATE_ROUTER,
      payload: router
    };
  },
  transitionTo: (pathname) => (dispatch, getState) => {
    return getState().ui.app.router.transitionTo(pathname);
  }
};
