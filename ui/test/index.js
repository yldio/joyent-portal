const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <Base> without exploding', (t) => {
  const Base = require('../src/components/base');
  const wrapper = shallow(<Base />);
  t.deepEqual(wrapper.length, 1);
});
