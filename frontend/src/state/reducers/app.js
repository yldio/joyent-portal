import { handleActions } from 'redux-actions';
import { updateRouter } from '@state/actions';

export default handleActions({
  [updateRouter.toString()]: (state, action) => {
    return {
      ...state,
      router: action.payload
    };
  }
}, {});
