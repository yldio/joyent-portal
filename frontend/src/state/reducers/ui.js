import { handleActions } from 'redux-actions';
import { toggleServicesQuickActions } from '@state/actions';

export default handleActions({
  [toggleServicesQuickActions.toString()]: (state, action) => {
    const {
      position,
      service,
      show
    } = action.payload;

    const s = show !== undefined ? show :
      !state.services.quickActions.service ||
        service.uuid !== state.services.quickActions.service.uuid;

    const quickActions = s ? {
      show: s,
      position,
      service
    } : {
      show: false
    }

    return {
      ...state,
      services: {
        ...state.services,
        quickActions
      }
    }

    return state;
  }
}, {});
