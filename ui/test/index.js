const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <Avatar> without exploding', (t) => {
  const Avatar = require('../src/components/avatar').default;
  const wrapper = shallow(<Avatar />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Base> without exploding', (t) => {
  const Base = require('../src/components/base').default;
  const wrapper = shallow(<Base />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Button> without exploding', (t) => {
  const Button = require('../src/components/button').default;
  const wrapper = shallow(<Button />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Close> without exploding', (t) => {
  const Close = require('../src/components/close').default;
  const wrapper = shallow(<Close />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Checkbox> without exploding', (t) => {
  const Checkbox = require('../src/components/form/checkbox').default;
  const wrapper = shallow(<Checkbox />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Column> without exploding', (t) => {
  const Column = require('../src/components/column').default;
  const wrapper = shallow(<Column />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Container> without exploding', (t) => {
  const Container = require('../src/components/container').default;
  const wrapper = shallow(<Container />);
  t.deepEqual(wrapper.length, 1);
});

// test('renders <Icon> without exploding', (t) => {
//   const Icon = require('../src/components/icon');
//   const wrapper = shallow(<Icon />);
//   t.deepEqual(wrapper.length, 1);
// });

test('renders <Radio> without exploding', (t) => {
  const Radio = require('../src/components/form/radio').default;
  const wrapper = shallow(<Radio />);
  t.deepEqual(wrapper.length, 1);
});

// test('renders <RadioGroup> without exploding', (t) => {
//   const RadioGroup = require('../src/components/radio-group');
//   const wrapper = shallow(<RadioGroup />);
//   t.deepEqual(wrapper.length, 1);
// });

test('renders <Row> without exploding', (t) => {
  const Row = require('../src/components/row').default;
  const wrapper = shallow(<Row />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Toggle> without exploding', (t) => {
  const Toggle = require('../src/components/toggle').default;
  const wrapper = shallow(<Toggle />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Widget> without exploding', (t) => {
  const Widget = require('../src/components/widget').default;
  const wrapper = shallow(<Widget />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Input> without exploding', (t) => {
  const Input = require('../src/components/form/input').default;
  const wrapper = shallow(<Input />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <RangeSlider> without exploding', (t) => {
  const RangeSlider = require('../src/components/range-slider').default;
  const wrapper = shallow(<RangeSlider />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Select> without exploding', (t) => {
  const Select = require('../src/components/form/select').default;
  const wrapper = shallow(<Select />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Pagination> without exploding', (t) => {
  const Pagination = require('../src/components/pagination').default;
  const wrapper = shallow(<Pagination />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Notification> without exploding', (t) => {
  const Pagination = require('../src/components/notification').default;
  const wrapper = shallow(<Pagination />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Tooltip> without exploding', (t) => {
  const Tooltip = require('../src/components/tooltip').default;
  const wrapper = shallow(<Tooltip />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <H1> without exploding', (t) => {
  const H1 = require('../src/components/base-elements').H1;
  const wrapper = shallow(<H1 />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <H2> without exploding', (t) => {
  const H2 = require('../src/components/base-elements').H2;
  const wrapper = shallow(<H2 />);
  t.deepEqual(wrapper.length, 1);
});
