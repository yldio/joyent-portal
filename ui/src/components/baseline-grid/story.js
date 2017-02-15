const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const BaseElements = require('../base-elements');
const Input = require('../input');

const {
  H1
} = BaseElements;

storiesOf('Baseline', module)
  .add('margin-left', () => (
    <Base>
      <H1 marginLeft='2'>Heyo</H1>
    </Base>
  ))
  .add('padding', () => (
    <Base>
      <Input padding='3' />
    </Base>
  ));
