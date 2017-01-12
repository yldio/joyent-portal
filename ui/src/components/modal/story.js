const React = require('react');
const constants = require('../../shared/constants');
const {
  colors
} = constants;

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Modal = require('./');

const _customCloseStyle = `
  border: solid ${colors.alert} 5px;
  border-radius: 50%;
`;

storiesOf('Modal', module)
  .add('Default', () => (
    <Base>
      <Modal>
        <h2>This is the Modal</h2>
      </Modal>
    </Base>
  ))
  .add('Custom Styles on Close', () => (
    <Base>
      <Modal customCloseStyle={_customCloseStyle}>
        <h2>This is the Modal</h2>
      </Modal>
    </Base>
  ))
  .add('Dismiss Function', () => (
    <Base>
      <Modal handleDismiss={function noop() {}}>
        <p>This has a handleDismiss (noop) function</p>
      </Modal>
    </Base>
  ));