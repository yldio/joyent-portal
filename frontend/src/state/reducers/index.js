const Redux = require('redux');

const {
  combineReducers
} = Redux;

module.exports = () => {
  return combineReducers({
    account: require('@state/reducers/account'),
    app: require('@state/reducers/app'),
    intl: require('@state/reducers/intl'),
    orgs: require('@state/reducers/orgs'),
    projects: require('@state/reducers/projects')
  });
};
