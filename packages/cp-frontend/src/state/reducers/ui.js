import { handleActions } from 'redux-actions';
import { toggleServicesQuickActions } from '@state/actions';

export default handleActions(
  {
    [toggleServicesQuickActions.toString()]: (state, action) => {
      const { position, service, show } = action.payload;

      const s = show === undefined
        ? !state.services.quickActions.service ||
            service.id !== state.services.quickActions.service.id
        : show;

      const quickActions = s
        ? {
            show: s,
            position,
            service
          }
        : {
            show: false
          };

      return {
        ...state,
        services: {
          ...state.services,
          quickActions
        }
      };
    }
  },
  {}
);
