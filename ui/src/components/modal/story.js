const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Modal = require('./');
const Close = require('../close');

storiesOf('Modal', module)
  .add('Default', () => (
    <Base>
      <Modal>
        <Close />
        <h2>This is the Modal</h2>
      </Modal>
    </Base>
  ));
