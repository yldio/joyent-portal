const createLogger = require('redux-logger');
const enableBatching = require('redux-batched-actions').enableBatching;
const promiseMiddleware = require('redux-promise-middleware').default;
const redux = require('redux');
const thunk = require('redux-thunk').default;

const createReducer = require('@state/reducers');

const {
  createStore,
  compose,
  applyMiddleware
} = redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

module.exports = (state = Object.freeze({})) => {
  return createStore(
    enableBatching(createReducer()),
    state,
    composeEnhancers(
      applyMiddleware(
        createLogger(),
        promiseMiddleware(),
        thunk
      )
    )
  );
};
