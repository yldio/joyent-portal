import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import account from '@state/reducers/account';
import app from '@state/reducers/app';
import instances from '@state/reducers/instances';
import intl from '@state/reducers/intl';
import metrics from '@state/reducers/metrics';
import monitors from '@state/reducers/monitors';
import orgs from '@state/reducers/orgs';
import projects from '@state/reducers/projects';
import services from '@state/reducers/services';
import members from '@state/reducers/members';

export default () => {
  return combineReducers({
    account,
    app,
    datacenters: (state = {}) => state,
    form,
    instances,
    intl,
    metrics,
    monitors,
    orgs,
    projects,
    services,
    members
  });
};
