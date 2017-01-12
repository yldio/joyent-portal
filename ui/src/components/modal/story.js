const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Modal = require('./');

const _customCloseStyle = `
  border: solid ${colors.alert} ${remcalc(5)};
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