const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Modal = require('./');

storiesOf('Modal', module)
  .add('Default', () => (
    <Base>
      <Modal>
        <h2>This is the Modal</h2>
      </Modal>
    </Base>
  ));