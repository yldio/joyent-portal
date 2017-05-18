// const Reselect = require('reselect');
const get = require('lodash.get');

const router = (state) => {
  return get(state, 'ui.app.router');
};

module.exports = {
  router
};
