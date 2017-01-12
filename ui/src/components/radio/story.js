const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Radio = require('./');

storiesOf('Radio', module)
  .add('Default', () => (
    <Radio>
      Video killed the radio star
    </Radio>
  ))
  .add('Checked', () => (
    <Radio checked onChange={function noop() {}} />
  ))
  .add('Disabled', () => (
    <Radio disabled />
  ));