const ReduxActions = require('redux-actions');
const actions = require('../actions');

const {
  handleActions
} = ReduxActions;

const {
  FETCH_CHANGES
} = actions;

exports.data = handleActions({
  [`${FETCH_CHANGES}_FULFILLED`]: (state, action) => {
    return action.payload;
  }
}, []);

exports.ui = handleActions({
  [`${FETCH_CHANGES}_PENDING`]: (state, action) => {
    return {
      ...state,
      loading: true
    };
  },
  [`${FETCH_CHANGES}_FULFILLED`]: (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false
    };
  },
  [`${FETCH_CHANGES}_REJECTED`]: (state, action) => {
    // TODO: deal with error
    return {
      ...state,
      loading: false,
      loaded: false
    };
  }
}, {
  loading: false,
  loaded: false
});
