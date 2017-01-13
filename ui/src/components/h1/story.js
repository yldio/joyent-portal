const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const H1 = require('./');

storiesOf('H1', module)
  .add('H1', () => (
    <Base>
      <h1>This is a H1</h1>
    </Base>
  ))
  ;