import { handleActions } from 'redux-actions';
import { toggleServicesQuickActions, toggleInstancesTooltip } from '@state/actions';

export const _toggleServicesQuickActions = (state, action) => {
  const { position, service, show } = action.payload;

  const s =
    show === undefined
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
};

export const _toggleInstancesTooltip = (state, action) => {
  const { position, instance, show, type } = action.payload;

  const s =
    show === undefined
      ? !state.instances.tooltip.instance ||
        instance.id !== state.instances.tooltip.instance.id
      : show;

  const tooltip = s
    ? {
        show: true,
        position,
        instance,
        type
      }
    : {
        show: false
      };

  return {
    ...state,
    instances: {
      ...state.instances,
      tooltip
    }
  };
};

export default handleActions(
  {
    [toggleServicesQuickActions.toString()]: _toggleServicesQuickActions,
    [toggleInstancesTooltip.toString()]: _toggleInstancesTooltip
  },
  {}
);
