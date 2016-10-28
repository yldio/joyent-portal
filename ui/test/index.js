const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <Avatar> without exploding', (t) => {
  const Avatar = require('../src/components/avatar');
  const wrapper = shallow(<Avatar />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Base> without exploding', (t) => {
  const Base = require('../src/components/base');
  const wrapper = shallow(<Base />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Button> without exploding', (t) => {
  const Button = require('../src/components/button');
  const wrapper = shallow(<Button />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Checkbox> without exploding', (t) => {
  const Checkbox = require('../src/components/checkbox');
  const wrapper = shallow(<Checkbox />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Column> without exploding', (t) => {
  const Column = require('../src/components/column');
  const wrapper = shallow(<Column />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Container> without exploding', (t) => {
  const Container = require('../src/components/container');
  const wrapper = shallow(<Container />);
  t.deepEqual(wrapper.length, 1);
});