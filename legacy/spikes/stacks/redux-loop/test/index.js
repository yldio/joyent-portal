const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <Home> without exploding', (t) => {
  const Home = require('../src/client/containers/home');
  const wrapper = shallow(<Home />);
  t.deepEqual(wrapper.length, 1);
});
