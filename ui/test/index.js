const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <Button> without exploding', (t) => {
  const Button = require('../src/components/button');
  const wrapper = shallow(<Button />);
  t.deepEqual(wrapper.length, 1);
});

