import { handleActions } from 'redux-actions';
import initialState from '@root/intl';

export default handleActions({
  'x': (state) => state // somehow handleActions needs at least one reducer
}, initialState);
