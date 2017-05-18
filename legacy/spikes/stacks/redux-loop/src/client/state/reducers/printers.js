const loopPromise = require('../loop-promise');
const ReduxActions = require('redux-actions');
const ReduxLoop = require('redux-loop');
const find = require('lodash.find');
const actions = require('../actions');

const {
  handleActions
} = ReduxActions;

const {
  loop,
  Effects
} = ReduxLoop;

const {
  UPDATE_WORKER_ID,
  UPDATE_PRINTERS,
  LOCK_PRINTER,
  PROMPT_CONFIRM_LOCK,
  CONFIRM_LOCK,
  PROMPT_LOCK,
  CONFIRM_OVERRIDE,
  EMIT_LOCK_PRINTER,
  PRINTER_NOT_FOUND,
  printerNotFound,
  confirmOverride,
  promptOrConfirmLock,
  confirmLock,
  promptLock,
  confirm,
  alert,
  prompt
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

exports.global = handleActions({
  [LOCK_PRINTER]: (state, {
    payload
  }) => {
    const {
      ui,
      data
    } = state;

    const {
      printers
    } = data;

    const {
      printers: {
        locked
      }
    } = ui;

    if (locked === payload) {
      return state;
    }

    const printer = find(printers, ['id', payload]);

    if (!printer) {
      return loop(
        state,
        Effects.constant(printerNotFound(payload))
      );
    }

    const action = (printer.lock ? confirmOverride : promptOrConfirmLock)(payload);

    return loop(
      state,
      Effects.constant(action)
    );
  },
  [PROMPT_CONFIRM_LOCK]: (state, {
    payload
  }) => {
    const action = (payload ? confirmLock : promptLock)(payload);

    return loop(
      state,
      Effects.constant(action)
    );
  },
  [CONFIRM_LOCK]: (state, {
    payload
  }) => {
    const msg = `Do you want to lock printer ${payload}?`;

    return loop(
      state,
      loopPromise({
        type: CONFIRM_LOCK,
        payload: confirm(msg),
        ctx: payload
      })
    );
  },
  [`${CONFIRM_LOCK}_FULFILLED`]: (state, {
    payload,
    ctx
  }) => {
    const worker = require('../../worker');

    return !payload ? state : loop(
      state,
      loopPromise({
        type: EMIT_LOCK_PRINTER,
        payload: worker.dispatch({
          type: 'LOCK_PRINTER',
          payload: ctx
        })
      })
    );
  },
  [PROMPT_LOCK]: (state, action) => {
    const {
      ui,
      data
    } = state;

    const {
      printers
    } = data;

    const msg = `Please select a printer to lock: ${
      printers.map(({
        id,
        name
      }) => {
        return `\n(${id}) ${name}`;
      })
    }`;

    return loop(
      state,
      loopPromise({
        type: PROMPT_LOCK,
        payload: prompt(msg)
      })
    );
  },
  [`${PROMPT_LOCK}_FULFILLED`]: (state, {
    payload
  }) => {
    const {
      data: {
        printers
      }
    } = state;

    const printer = find(printers, ['id', payload]);

    if (!printer) {
      return loop(
        state,
        Effects.constant(printerNotFound(payload))
      );
    }

    const worker = require('../../worker');

    return loop(
      state,
      loopPromise({
        type: EMIT_LOCK_PRINTER,
        payload: worker.dispatch({
          type: 'LOCK_PRINTER',
          payload: ctx
        })
      })
    );
  },
  [CONFIRM_OVERRIDE]: (state, {
    payload
  }) => {
    const msg = `Printer ${payload} already locked! Do you want to override?`;

    return loop(
      state,
      loopPromise({
        type: CONFIRM_LOCK,
        payload: confirm(msg),
        ctx: payload
      })
    );
  },
  [PRINTER_NOT_FOUND]: (state, action) => {
    const msg = `Printer ${printerId} not found. Try again`;

    return loop(
      state,
      loopPromise({
        type: PRINTER_NOT_FOUND,
        payload: alert(msg)
      })
    );
  },
  [`${PRINTER_NOT_FOUND}_FULFILLED`]: (state, action) => {
    return loop(
      state,
      Effects.constant({
        type: PROMPT_LOCK
      })
    );
  }
}, {});
