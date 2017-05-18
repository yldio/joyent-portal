const createLogger = require('redux-logger');
const promiseMiddleware = require('redux-promise-middleware').default;
const thunk = require('redux-thunk').default;
const redux = require('redux');
const reducer = require('./actions');

const {
  createStore,
  compose,
  applyMiddleware
} = redux;

module.exports = (state = Object.freeze({})) => {
  return createStore(reducer, state, applyMiddleware(
    createLogger({
      predicate: (getState, action) => action.type !== 'UPDATE_STATS'
    }),
    promiseMiddleware(),
    thunk
  ));
};
