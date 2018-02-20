import { reduxBatch } from '@manaflair/redux-batch';
import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as valuesReducer } from 'react-redux-values';
import paramCase from 'param-case';
import global from './global';

const initialState = {};

export default () => {
  return createStore(
    combineReducers({
      values: valuesReducer,
      form: formReducer,
      ui: (state = {}) => state
    }),
    global.__REDUX_STATE__ || initialState,
    compose(
      reduxBatch,
      // If you are using the devToolsExtension, you can add it here also
      // eslint-disable-next-line no-negated-condition
      typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? global.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
};
