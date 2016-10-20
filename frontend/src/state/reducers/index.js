const Redux = require('redux');

const {
  combineReducers
} = Redux;

module.exports = () => {
  return combineReducers({
    app: require('./app.js'),
    intl: require('./intl.js')
  });
};
