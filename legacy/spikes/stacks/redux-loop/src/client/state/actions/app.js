const ReduxActions = require('redux-actions');
const app = require('../../../../package.json').name;
const selectors = require('../selectors');

const {
  router
} = selectors;

const {
  createAction
} = ReduxActions;

const UPDATE_ROUTER = `${app}/changes/UPDATE_ROUTER`;

const updateRouter = createAction(UPDATE_ROUTER);

const transitionTo = (pathname) => (dispatch, getState) => {
  return router(getState()).transitionTo(pathname);
};

module.exports = {
  UPDATE_ROUTER,
  updateRouter,
  transitionTo
};
