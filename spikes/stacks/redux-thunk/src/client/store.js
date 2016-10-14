const createReducer = require('./reducers');
const enableBatching = require('redux-batched-actions').enableBatching;
const thunk = require('redux-thunk').default;
const promiseMiddleware = require('redux-promise-middleware').default;
const createLogger = require('redux-logger');
const redux = require('redux');


const {
  createStore,
  compose,
  applyMiddleware
} = redux;

module.exports = (state = Object.freeze({})) => {
  return createStore(
    enableBatching(createReducer()),
    state,
    compose(
      applyMiddleware(
        createLogger(),
        promiseMiddleware(),
        thunk
      )
    )
  );
};
