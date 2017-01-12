const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const RangeSlider = require('./');

storiesOf('Range Slider', module)
  .add('Default', () => (
    <RangeSlider />
  ));