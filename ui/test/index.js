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

test('renders <AddMetric> without exploding', (t) => {
  const AddMetric = require('../src/components/add-metric');
  const wrapper = shallow(<AddMetric />);
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

// test('renders <Icon> without exploding', (t) => {
//   const Icon = require('../src/components/icon');
//   const wrapper = shallow(<Icon />);
//   t.deepEqual(wrapper.length, 1);
// });

test('renders <Radio> without exploding', (t) => {
  const Radio = require('../src/components/radio');
  const wrapper = shallow(<Radio />);
  t.deepEqual(wrapper.length, 1);
});

// test('renders <RadioGroup> without exploding', (t) => {
//   const RadioGroup = require('../src/components/radio-group');
//   const wrapper = shallow(<RadioGroup />);
//   t.deepEqual(wrapper.length, 1);
// });

test('renders <Row> without exploding', (t) => {
  const Row = require('../src/components/row');
  const wrapper = shallow(<Row />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Tab> without exploding', (t) => {
  const Tab = require('../src/components/tabs/tab');
  const wrapper = shallow(<Tab />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Tabs> without exploding', (t) => {
  const Tabs = require('../src/components/tabs');
  const wrapper = shallow(<Tabs />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Toggle> without exploding', (t) => {
  const Toggle = require('../src/components/toggle');
  const wrapper = shallow(<Toggle />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Widget> without exploding', (t) => {
  const Widget = require('../src/components/widget');
  const wrapper = shallow(<Widget />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Input> without exploding', (t) => {
  const Input = require('../src/components/input');
  const wrapper = shallow(<Input />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <RangeSlider> without exploding', (t) => {
  const RangeSlider = require('../src/components/range-slider');
  const wrapper = shallow(<RangeSlider />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Select> without exploding', (t) => {
  const Select = require('../src/components/select');
  const wrapper = shallow(<Select />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Pagination> without exploding', (t) => {
  const Pagination = require('../src/components/pagination');
  const wrapper = shallow(<Pagination />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Notification> without exploding', (t) => {
  const Pagination = require('../src/components/notification');
  const wrapper = shallow(<Pagination />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Tooltip> without exploding', (t) => {
  const Tooltip = require('../src/components/tooltip');
  const wrapper = shallow(<Tooltip />);
  t.deepEqual(wrapper.length, 1);
});
