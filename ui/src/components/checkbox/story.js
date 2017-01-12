const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Checkbox = require('./');

storiesOf('Checkbox', module)
  .add('Default', () => (
    <Checkbox />
  ))
  .add('Checked', () => (
    <Checkbox checked onChange={function noop() {}} />
  ))
  .add('Disabled', () => (
    <Checkbox disabled />
  ));