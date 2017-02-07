const React = require('react');
const StoryHelper = require('./story-helper');

const {
  storiesOf
} = require('@kadira/storybook');

storiesOf('Topology', module)
  .add('5 services', () => (
    <StoryHelper />
  ));
