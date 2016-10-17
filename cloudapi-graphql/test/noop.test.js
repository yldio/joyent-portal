// TODO: REMOVE, JUST FOR AN EXAMPLE

const test = require('ava');

test('foo', t => {
  t.pass();
});

test('bar', t => {
  const bar = Promise.resolve('bar');

  bar.then(() => t.is(bar, 'bar'));
});
