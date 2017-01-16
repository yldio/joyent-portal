const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const BaseElements = require('./');

const {
  H1,
  H2
} = BaseElements;

storiesOf('Base Elements', module)
  .add('H1', () => (
    <Base>
      <H1>This is a H1</H1>
    </Base>
  ))
  .add('H2', () => (
    <Base>
      <H2>This is a H2</H2>
    </Base>
  ))
;