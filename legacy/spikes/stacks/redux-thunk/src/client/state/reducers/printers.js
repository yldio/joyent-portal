const ReduxActions = require('redux-actions');
const find = require('lodash.find');
const actions = require('../actions');

const {
  handleActions
} = ReduxActions;

const {
  UPDATE_WORKER_ID,
  UPDATE_PRINTERS
} = actions;

exports.data = handleActions({
  [UPDATE_PRINTERS]: (state, action) => {
    return action.payload;
  }
}, []);

exports.ui = handleActions({
  [UPDATE_WORKER_ID]: (state, action) => {
    return {
      ...state,
      id: action.payload
    };
  },
  [UPDATE_PRINTERS]: (state, action) => {
    const locked = (find(action.payload, (printer) => {
      return (
        printer.lock &&
        printer.lock === state.id
      );
    }) || {}).id || '';

    return {
      ...state,
      locked
    };
  }
}, {
  id: '',
  locked: ''
});
