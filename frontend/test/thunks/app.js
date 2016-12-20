const mock = require('simple-mock');
const test = require('ava');

const thunks = require('@state/thunks');

const {
  transitionTo
} = thunks;

test('transitionTo should dispatch', (t) => {
  const pathname = '/hello';

  const state = {
    app: {
      router: {
        transitionTo: mock.spy((pathname) => pathname)
      }
    }
  };

  const dispatch = mock.spy(({
    PAYLOAD
  }) => {
    t.deepEqual(PAYLOAD, pathname);
  });

  const getState = () => state;

  transitionTo(pathname)(dispatch, getState);

  t.deepEqual(dispatch.called, true);
  t.deepEqual(dispatch.callCount, 1);
  t.deepEqual(state.app.router.transitionTo.called, true);
  t.deepEqual(state.app.router.transitionTo.callCount, 1);
});
