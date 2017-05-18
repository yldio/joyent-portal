const take = require('lodash.take');

const actions =  {
  'UPDATE_STATS': (state, action) => {
    const data = [action.payload].concat(state[action.subscription] || []);

    return {
      ...state,
      [action.subscription]: take(data, state.windowSize)
    };
  }
};

module.exports = (state, action) => {
  return !actions[action.type] ? state : actions[action.type](state, action);
};

module.exports.subscribe = (id) => (dispatch, getState) => {
  const {
    ws
  } = getState();

  const p = new Promise((resolve, reject) => {
    ws.subscribe(`/stats/${id}`, (update, flag) => {
      dispatch({
        type: 'UPDATE_STATS',
        payload: update,
        subscription: id
      });
    }, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  return dispatch({
    action: 'SUBSCRIBE',
    payload: p
  });
};

module.exports.unsubscribe = (id) => (dispatch, getState) => {
  const {
    ws
  } = getState();

  const p = new Promise((resolve, reject) => {
    ws.unsubscribe(`/stats/${id}`, null, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  return dispatch({
    action: 'UNSUBSCRIBE',
    payload: p
  });
};
