const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Notificaton = require('./');

storiesOf('Notificaton', module)
  .add('Default', () => (
    <Base>
      <Notificaton>
        <span>This is the default content</span>
      </Notificaton>
    </Base>
  ))
  .add('Success', () => (
    <Base>
      <Notificaton
        close={function noop() {}}
        type="success"
      >
        <span>This is a success notification that is closable</span>
      </Notificaton>
    </Base>
  ))
  .add('Alert', () => (
    <Base>
      <Notificaton type="alert">
        <span>This is the alert content</span>
      </Notificaton>
    </Base>
  ));