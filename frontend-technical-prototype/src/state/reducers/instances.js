import { handleActions } from 'redux-actions';
import { toggleInstanceCollapsed } from '@state/actions';
import { toggleCollapsed } from '@state/reducers/common';

export default handleActions({
  [toggleInstanceCollapsed.toString()]: toggleCollapsed
}, {});
