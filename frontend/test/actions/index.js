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
  type: '/UPDATE_ROUTER'
}));

test('updateRouter action', actionTest(updateRouter, {
  transitionTo: '[Function]'
}, {
  type: '/UPDATE_ROUTER',
  payload: {
    transitionTo: '[Function]'
  }
}));
