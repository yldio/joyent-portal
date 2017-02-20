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

test('renders <ProjectSection> without exploding', (t) => {
  // eslint-disable-next-line max-len
  const Section = require('@containers/project/section').default.WrappedComponent;
  const wrapper = render(withIntl(<Section />));
  t.deepEqual(wrapper.length, 1);
});
