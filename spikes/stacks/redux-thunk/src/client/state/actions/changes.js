const app = require('../../../../package.json').name;
const api = require('../../api');

const FETCH_CHANGES = `${app}/changes/FETCH_CHANGES`;
const REMOVE_CHANGE = `${app}/changes/REMOVE_CHANGE`;

const fetchChanges = () => {
  return {
    type: FETCH_CHANGES,
    payload: api.fetchChanges()
  };
};

const removeChange = (id) => (dispatch) => {
  return dispatch({
    type: REMOVE_CHANGE,
    payload: api.removeChange(id)
  }).then(() => {
    return dispatch(fetchChanges());
  });
};

module.exports = {
  FETCH_CHANGES,
  REMOVE_CHANGE,
  fetchChanges,
  removeChange
};
