import constantCase from 'constant-case';
import { createAction } from 'redux-actions';

const APP = constantCase(process.env.APP_NAME);

/** ***************************** UI ****************************** */

export const toggleServicesQuickActions = createAction(
  `${APP}/TOGGLE_SERVICES_QUICK_ACTIONS`
);

export const toggleInstancesTooltip = createAction(
  `${APP}/TOGGLE_INSTANCES_TOOLTIP`
);
