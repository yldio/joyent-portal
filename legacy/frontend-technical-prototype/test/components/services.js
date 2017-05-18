const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const create = require('../helpers/create');

const {
  render
} = enzyme;

const {
  withIntl,
  withRouter
} = create;

test('renders <Services> without exploding', (t) => {
  const Services =
    require('@containers/services/view').default.WrappedComponent;
  const wrapper = render(withRouter(withIntl(<Services />)));
  t.deepEqual(wrapper.length, 1);
});

test.skip('renders connected <Services> without exploding', (t) => {
  const Services = require('@containers/services/view').default;
  const wrapper = render(create(<Services />));
  t.deepEqual(wrapper.length, 1);
});
