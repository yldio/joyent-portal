const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  metricDurationChange
} = actions;

module.exports = handleActions({
  [metricDurationChange.toString()]: (state, action) => {
    return ({
      ...state,
      ui: {
        ...state.ui,
        [action.payload.dataset]: {
          ...state.ui[action.payload.dataset],
          duration: action.payload.duration
        }
      }
    });
  }
}, {});
