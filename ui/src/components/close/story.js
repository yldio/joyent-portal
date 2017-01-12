const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Close = require('./');

storiesOf('Close', module)
  .add('Default', () => (
    <Base
      style={{
        position: 'relative',
        width: 60
      }}
    >
      <Close onClick={function noop() {}} />
    </Base>
  ));