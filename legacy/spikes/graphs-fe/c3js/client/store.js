const takeRight = require('lodash.takeright');
const redux = require('redux');

const {
  createStore,
  compose,
  applyMiddleware
} = redux;

const reducer = (state, action) => {
  if (action.type !== 'UPDATE_STATS') {
    return state;
  }

  const data = (state.data || []).concat([action.payload]);

  return {
    ...state,
    data: takeRight(data, 50)
  };
};

module.exports = (state = Object.freeze({})) => {
  return createStore(reducer, state);
};
