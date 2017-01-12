const ReduxActions = require('redux-actions');

const actions = require('@state/actions');

const {
  handleActions
} = ReduxActions;

const {
  addMetric
} = actions;

// This will need to be handled by an async action
// to update on the server too
module.exports = handleActions({
  [addMetric.toString()]: (state, action) => {
    return ({
      ...state,
      data: {
        types: [
          ...state.data.types,
          action.payload
        ],
        datasets: [
          ...state.data.datasets
        ]
      }
    });
  }
}, {});
