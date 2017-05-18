const reduceReducers = require('../reduce-reducers');
const ReduxLoop = require('redux-loop');

const app = require('./app');
const printers = require('./printers');
const changes = require('./changes');

const {
  combineReducers
} = ReduxLoop;

module.exports = () => reduceReducers(
  // app.global,
  printers.global,
  // changes.global
  combineReducers({
    data: combineReducers({
      printers: printers.data,
      changes: changes.data
    }),
    ui: combineReducers({
      changes: changes.ui,
      printers: printers.ui,
      app: app.ui
    })
  })
);
