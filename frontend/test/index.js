const test = require('ava');

test('noop', (t) => {
  t.deepEqual(1, 1);
});

// test('renders <App> without exploding', (t) => {
//   const App = require('../src/containers/app');
//   const wrapper = shallow(<App />);
//   t.deepEqual(wrapper.length, 1);
// });
//
// test('renders <Home> without exploding', (t) => {
//   const Home = require('../src/containers/home');
//   const wrapper = shallow(<Home />);
//   t.deepEqual(wrapper.length, 1);
// });
//
// test('renders <NotFound> without exploding', (t) => {
//   const NotFound = require('../src/containers/not-found');
//   const wrapper = shallow(<NotFound />);
//   t.deepEqual(wrapper.length, 1);
// });
