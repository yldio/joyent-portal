const ReduxActions = require('redux-actions');
const app = require('../../../../package.json').name;
const find = require('lodash.find');
const changes = require('./changes');

const {
  createAction
} = ReduxActions;

const {
  removeChange
} = changes;

const UPDATE_PRINTERS = `${app}/printers/UPDATE_PRINTERS`;
const UPDATE_WORKER_ID = `${app}/printers/UPDATE_WORKER_ID`;
const EMIT_LOCK_PRINTER = `${app}/printers/EMIT_LOCK_PRINTER`;
const LOCK_PRINTER = `${app}/printers/LOCK_PRINTER`;
const PRINTER_NOT_FOUND = `${app}/printers/PRINTER_NOT_FOUND`;
const DO_PRINT = `${app}/printers/DO_PRINT`;
const EMIT_PRINT_JOB = `${app}/printers/EMIT_PRINT_JOB`;
const CONFIRM_OVERRIDE = `${app}/printers/CONFIRM_OVERRIDE`;
const CONFIRM_LOCK = `${app}/printers/CONFIRM_LOCK`;
const PROMPT_LOCK = `${app}/printers/PROMPT_LOCK`;
const PROMPT_CONFIRM_LOCK = `${app}/printers/PROMPT_CONFIRM_LOCK`;
const PRINT = `${app}/printers/PRINT`;

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

const confirmOverride = createAction(CONFIRM_OVERRIDE);
const confirmLock = createAction(CONFIRM_LOCK);
const promptLock = createAction(PROMPT_LOCK);
const updatePrinters = createAction(UPDATE_PRINTERS);
const updateWorkerId = createAction(UPDATE_WORKER_ID);
const promptOrConfirmLock = createAction(PROMPT_CONFIRM_LOCK);
const lockPrinter = createAction(LOCK_PRINTER);
const printerNotFound = createAction(PRINTER_NOT_FOUND);
const print = createAction(PRINT);

// const print = (changeId) => (dispatch, getState) => {
//   const {
//     ui,
//     data
//   } = getState();
//
//   const {
//     printers
//   } = data;
//
//   const {
//     printers: {
//       locked
//     }
//   } = ui;
//
//   const worker = require('../../worker');
//
//   const _print = () => {
//     return dispatch({
//       type: EMIT_PRINT_JOB,
//       payload: worker.dispatch({
//         type: 'PRINT',
//         payload: changeId
//       })
//     }).then(() => {
//       return dispatch(removeChange(changeId));
//     });
//   };
//
//   const lock = (printerId) => {
//     return dispatch({
//       type: EMIT_LOCK_PRINTER,
//       payload: worker.dispatch({
//         type: 'LOCK_PRINTER',
//         payload: printerId
//       })
//     }).then(_print);
//   };
//
//   const askToOverride = (printerId) => {
//     const msg = `Printer ${printerId} already locked! Do you want to override?`;
//     return confirm(msg).then((yes) => {
//       return yes ? lock(printerId) : null;
//     });
//   };
//
//   const askToLock = () => {
//     const msg = `Please select a printer to lock: ${
//       printers.map(({
//         id,
//         name
//       }) => {
//         return `\n(${id}) ${name}`;
//       })
//     }`;
//
//     return prompt(msg).then((printerId) => {
//       const printer = find(printers, ['id', printerId]);
//
//       if (!printer) {
//         return alert(`Printer ${printerId} not found. Try again`).then(() => {
//           return print(printerId)(dispatch, getState);
//         });
//       }
//
//       return printer.lock ? askToOverride(printerId) : lock(printerId);
//     });
//   };
//
//   return !locked ? askToLock() : _print();
// };

module.exports = {
  UPDATE_PRINTERS,
  UPDATE_WORKER_ID,
  EMIT_LOCK_PRINTER,
  LOCK_PRINTER,
  PRINTER_NOT_FOUND,
  DO_PRINT,
  EMIT_PRINT_JOB,
  CONFIRM_OVERRIDE,
  CONFIRM_LOCK,
  PROMPT_LOCK,
  PROMPT_CONFIRM_LOCK,
  PRINT,
  PRINTER_NOT_FOUND,
  confirm,
  prompt,
  alert,
  updatePrinters,
  updateWorkerId,
  confirmOverride,
  confirmLock,
  promptLock,
  promptOrConfirmLock,
  lockPrinter,
  print
};
