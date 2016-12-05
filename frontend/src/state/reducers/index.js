const Redux = require('redux');

const {
  combineReducers
} = Redux;

module.exports = () => {
  return combineReducers({
    app: require('@state/reducers/app'),
    intl: require('@state/reducers/intl')
  });
};
