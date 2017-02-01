const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const BaseElements = require('./');

const {
  H1,
  H2,
  H3,
  P,
  Small,
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
  .add('H3', () => (
    <Base>
      <H3>This is a H3</H3>
    </Base>
  ))
  .add('P', () => (
    <Base>
      <P>This is a P</P>
    </Base>
  ))
  .add('Small', () => (
    <Base>
      <Small>This is a Small</Small>
    </Base>
  ))
;