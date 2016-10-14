const ReduxActions = require('redux-actions');
const app = require('../../../package.json').name;
const api = require('../api');

const {
  createAction,
  handleActions
} = ReduxActions;

const {
  fetchChanges
} = api;

const FETCH_CHANGES = `${app}/changes/FETCH_CHANGES`;

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

exports.actions = {
  fetchChanges: () => {
    return {
      type: FETCH_CHANGES,
      payload: fetchChanges()
    };
  }
};
