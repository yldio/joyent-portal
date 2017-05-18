const React = require('react');
const Storybook = require('@kadira/storybook');

const Home = require('../src/client/containers/home');

const homeStories = Storybook.storiesOf('Home', module);

homeStories.add('with nothing', () => (
  <Home />
));
