const createLogger = require('redux-logger');
const createReducer = require('./reducers');
const enableBatching = require('redux-batched-actions').enableBatching;
const promiseMiddleware = require('redux-promise-middleware').default;
const redux = require('redux');
const thunk = require('redux-thunk').default;

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
