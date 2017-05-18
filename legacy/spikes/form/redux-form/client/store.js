const takeRight = require('lodash.takeright');
const redux = require('redux');
const reduxFormReducer = require('redux-form').reducer;

const {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} = redux;

/*const reducer = (state, action) => {
  if (action.type !== 'UPDATE_STATS') {
    return state;
  }

  const data = (state.data || []).concat([action.payload]);

  return {
    ...state,
    data: takeRight(data, 50)
  };
};*/

const reducer = combineReducers({ form: reduxFormReducer });

module.exports = (state = Object.freeze({})) => {
  return createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
