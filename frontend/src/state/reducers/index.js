const Redux = require('redux');

const {
  combineReducers
} = Redux;

module.exports = () => {
  return combineReducers({
    account: require('@state/reducers/account'),
    app: require('@state/reducers/app'),
    datacenters: (state = {}) => state,
    form: require('redux-form').reducer,
    instances: require('@state/reducers/instances'),
    intl: require('@state/reducers/intl'),
    metrics: require('@state/reducers/metrics'),
    monitors: require('@state/reducers/monitors'),
    orgs: require('@state/reducers/orgs'),
    projects: require('@state/reducers/projects'),
    services: require('@state/reducers/services'),
    members: require('@state/reducers/members'),
  });
};
