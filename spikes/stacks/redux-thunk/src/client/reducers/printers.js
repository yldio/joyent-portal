const ReduxActions = require('redux-actions');
const app = require('../../../package.json').name;
const find = require('lodash.find');
const changes = require('./changes');

const {
  createAction,
  handleActions
} = ReduxActions;

const {
  actions: {
    removeChange
  }
} = changes;

const UPDATE_PRINTERS = `${app}/printers/UPDATE_PRINTERS`;
const UPDATE_WORKER_ID = `${app}/printers/UPDATE_WORKER_ID`;
const LOCK_PRINTER = `${app}/printers/LOCK_PRINTER`;
const PRINT = `${app}/printers/PRINT`;

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

// confirm should be an async op,
// let's mock it that way
const confirm = (msg) => {
  return new Promise((resolve, reject) => {
    resolve(window.confirm(msg));
  });
};

// prompt should be an async op,
// let's mock it that way
const prompt = (msg) => {
  return new Promise((resolve, reject) => {
    resolve(window.prompt(msg));
  });
};

// alert should be an async op,
// let's mock it that way
const alert = (msg) => {
  return new Promise((resolve, reject) => {
    resolve(window.alert(msg));
  });
};

const actions = exports.actions = {
  updatePrinters: createAction(UPDATE_PRINTERS),
  updateWorkerId: createAction(UPDATE_WORKER_ID),
  lockPrinter: (id) => (dispatch, getState) => {
    const {
      ui,
      data
    } = getState();

    const {
      printers
    } = data;

    const {
      printers: {
        locked
      }
    } = ui;

    if (locked === id) {
      return;
    }

    const printer = find(printers, ['id', id]);

    if (!printer) {
      return window.alert(`Printer ${id} not found`);
    }

    const worker = require('../worker');

    const lock = () => {
      return dispatch({
        type: LOCK_PRINTER,
        payload: worker.dispatch({
          type: 'LOCK_PRINTER',
          payload: id
        })
      });
    };

    const askToLock = () => {
      const msg = `Do you want to lock printer ${id}?`;
      return confirm(msg).then((yes) => {
        return yes ? lock(id) : null;
      });
    };

    const askToOverride = () => {
      const msg = `Printer ${id} already locked! Do you want to override?`;
      return confirm(msg).then((yes) => {
        return yes ? lock(id) : null;
      });
    };

    return printer.lock ? askToOverride() : askToLock();
  },
  print: (changeId) => (dispatch, getState) => {
    const {
      ui,
      data
    } = getState();

    const {
      printers
    } = data;

    const {
      printers: {
        locked
      }
    } = ui;

    const worker = require('../worker');

    const print = () => {
      return dispatch({
        type: PRINT,
        payload: worker.dispatch({
          type: 'PRINT',
          payload: changeId
        })
      }).then(() => {
        return dispatch(removeChange(changeId));
      });
    };

    const lock = (printerId) => {
      return dispatch({
        type: LOCK_PRINTER,
        payload: worker.dispatch({
          type: 'LOCK_PRINTER',
          payload: printerId
        })
      }).then(print);
    };

    const askToOverride = (printerId) => {
      const msg = `Printer ${printerId} already locked! Do you want to override?`;
      return confirm(msg).then((yes) => {
        return yes ? lock(printerId) : null;
      });
    };

    const askToLock = () => {
      const msg = `Please select a printer to lock: ${
        printers.map(({
          id,
          name
        }) => {
          return `\n(${id}) ${name}`;
        })
      }`;

      return prompt(msg).then((printerId) => {
        const printer = find(printers, ['id', printerId]);

        if (!printer) {
          return alert(`Printer ${printerId} not found. Try again`).then(() => {
            return actions.print(printerId)(dispatch, getState);
          });
        }

        return printer.lock ? askToOverride(printerId) : lock(printerId);
      });
    };

    return !locked ? askToLock() : print();
  }
};
