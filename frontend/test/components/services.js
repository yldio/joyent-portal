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

test('renders <Services> without exploding', (t) => {
  const Services = require('@containers/services').default.WrappedComponent;
  const wrapper = render(withIntl(<Services />));
  t.deepEqual(wrapper.length, 1);
});

test('renders connected <Services> without exploding', (t) => {
  const Services = require('@containers/services').default;
  const wrapper = render(create(<Services />));
  t.deepEqual(wrapper.length, 1);
});
