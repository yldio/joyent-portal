const ReduxActions = require('redux-actions');
const app = require('../../../package.json').name;
const find = require('lodash.find');

const {
  createAction,
  handleActions
} = ReduxActions;

const UPDATE_PRINTERS = `${app}/printers/UPDATE_PRINTERS`;
const UPDATE_WORKER_ID = `${app}/printers/UPDATE_WORKER_ID`;

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
        state.locked &&
        printer.lock === state.locked
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

exports.actions = {
  updatePrinters: createAction(UPDATE_PRINTERS),
  updateWorkerId: createAction(UPDATE_WORKER_ID)
};
