const ReduxAva = require('redux-ava');
const test = require('ava');

const actions = require('@state/actions');

const {
  actionTest
} = ReduxAva;

const {
  updateRouter
} = actions;

test('updateRouter action', actionTest(updateRouter, {
  type: '/APP/UPDATE_ROUTER'
}));

test('updateRouter action', actionTest(updateRouter, {
  transitionTo: '[Function]'
}, {
  type: '/APP/UPDATE_ROUTER',
  payload: {
    transitionTo: '[Function]'
  }
}));
