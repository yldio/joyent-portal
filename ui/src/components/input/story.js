const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Input = require('./');

storiesOf('Input', module)
  .add('Default', () => (
    <Base>
      <Input placeholder="I am the placeholder" />
    </Base>
  ))
  .add('type=email', () => (
    <Base>
      <Input
        label='Email Address'
        placeholder='Enter email'
        type='email'
      >
        <small>We&apos;ll never share your email with anyone else.</small>
      </Input>
    </Base>
  ))
  .add('Error', () => (
    <Base>
      <Input
        error="Somethings missing"
        placeholder="There was an error"
        value="alexw/makeusproud.com"
      />
    </Base>
  ));