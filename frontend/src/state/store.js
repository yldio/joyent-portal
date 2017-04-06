import createLogger from 'redux-logger';
import { enableBatching } from 'redux-batched-actions';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import perflogger from 'redux-perf-middleware';

import createReducer from '@state/reducers';
// import { isProduction } from '@utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (state = Object.freeze({})) => {
  return createStore(
    enableBatching(createReducer()),
    state,
    composeEnhancers(
      applyMiddleware(
        createLogger(),
        promiseMiddleware(),
        thunk/*,
        !isProduction() && perflogger*/
      )
    )
  );
};
