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

test.skip('renders <Service> without exploding', (t) => {
  const Service =
    require('@containers/service/summary').default.WrappedComponent;
  const wrapper = render(withRouter(withIntl(<Service />)));
  t.deepEqual(wrapper.length, 1);
});

test('renders connected <Service> without exploding', (t) => {
  const Service = require('@containers/service/summary').default;
  const wrapper = render(create(<Service />));
  t.deepEqual(wrapper.length, 1);
});
