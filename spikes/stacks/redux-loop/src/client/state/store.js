const createReducer = require('./reducers');
const enableBatching = require('redux-batched-actions').enableBatching;
const ReduxLoop = require('redux-loop');
const promiseMiddleware = require('redux-promise-middleware').default;
const createLogger = require('redux-logger');
const redux = require('redux');

const {
  install
} = ReduxLoop;

const {
  createStore,
  compose,
  applyMiddleware
} = redux;

module.exports = (initialState = Object.freeze({})) => {
  return createStore(
    enableBatching(createReducer()),
    initialState,
    compose(
      applyMiddleware(
        // createLogger(),
        promiseMiddleware()
      ),
      install()
    )
  );
};
