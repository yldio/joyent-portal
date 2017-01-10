const Redux = require('redux');

const {
  combineReducers
} = Redux;

module.exports = () => {
  return combineReducers({
    account: require('@state/reducers/account'),
    app: require('@state/reducers/app'),
    instances: require('@state/reducers/instances'),
    intl: require('@state/reducers/intl'),
    metrics: require('@state/reducers/metrics'),
    orgs: require('@state/reducers/orgs'),
    projects: require('@state/reducers/projects'),
    services: require('@state/reducers/services')
  });
};
