const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const {
  shallow
} = enzyme;

test('renders <App> without exploding', (t) => {
  const App = require('@containers/app');
  const wrapper = shallow(<App />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <Home> without exploding', (t) => {
  const Home = require('@containers/home').WrappedComponent;
  const wrapper = shallow(<Home />);
  t.deepEqual(wrapper.length, 1);
});

test('renders <NotFound> without exploding', (t) => {
  const NotFound = require('@containers/not-found');
  const wrapper = shallow(<NotFound />);
  t.deepEqual(wrapper.length, 1);
});
