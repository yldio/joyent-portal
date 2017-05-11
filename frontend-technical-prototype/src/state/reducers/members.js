import { handleActions } from 'redux-actions';

export default handleActions({
  'x': (state) => state // somehow handleActions needs at least one reducer
}, {});
