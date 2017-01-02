const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const create = require('../helpers/create');

const {
  render
} = enzyme;

const {
  withIntl
} = create;

test('renders <Service> without exploding', (t) => {
  const Service = require('@containers/service').WrappedComponent;
  const wrapper = render(withIntl(<Service />));
  t.deepEqual(wrapper.length, 1);
});

test('renders connected <Service> without exploding', (t) => {
  const Service = require('@containers/service');
  const wrapper = render(create(<Service />));
  t.deepEqual(wrapper.length, 1);
});
