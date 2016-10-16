const ReduxActions = require('redux-actions');
const app = require('../../../package.json').name;
const api = require('../api');

const {
  createAction,
  handleActions
} = ReduxActions;

const {
  fetchChanges,
  removeChange
} = api;

const FETCH_CHANGES = `${app}/changes/FETCH_CHANGES`;
const REMOVE_CHANGE = `${app}/changes/REMOVE_CHANGE`;

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

const actions = exports.actions = {
  fetchChanges: () => {
    return {
      type: FETCH_CHANGES,
      payload: fetchChanges()
    };
  },
  removeChange: (id) => (dispatch) => {
    return dispatch({
      type: REMOVE_CHANGE,
      payload: removeChange(id)
    }).then(() => {
      return dispatch(actions.fetchChanges());
    });
  }
};
