const redux = require('redux');
const services = require('./services');

const {
  createStore
} = redux;

const reducer = (state, action) => {
  return {
    ...state,
    data: services
  };
};

module.exports = (state = Object.freeze({})) => {
  return createStore(reducer, state);
};
