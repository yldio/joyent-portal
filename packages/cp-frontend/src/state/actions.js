import constantCase from 'constant-case';
import { createAction } from 'redux-actions';

const APP = constantCase(process.env.APP_NAME);

/******************************* UI *******************************/

export const addMemberToProject = createAction(`${APP}/PROJECT_ADD_MEMBER`);
