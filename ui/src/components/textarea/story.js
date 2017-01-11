const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Textarea = require('./');

storiesOf('Textarea', module)
  .add('Default', () => (
    <Base>
      <Textarea placeholder="I am the placeholder" />
    </Base>
  ))
  .add('Error', () => (
    <Base>
      <Textarea
        error="Somethings missing"
        placeholder="There was an error"
        value="alexw/makeusproud.com"
      />
    </Base>
  ));