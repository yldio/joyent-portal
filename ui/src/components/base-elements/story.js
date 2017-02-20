const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const constants = require('../../shared/constants');

const Column = require('../column');
const Row = require('../row');
const Base = require('../base');
const BaseElements = require('./');

const {
  colors
} = constants;

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
  .add('Style Guide', () => (
    <Base>
      <div>
        <Row>
          <Column>
            <H1>Special Heading - H1</H1>
            <ul>
              <li>Size - 36px</li>
              <li>Line Height - 42px</li>
              <li>Color - <code>{colors.base.secondary}</code></li>
            </ul>
          </Column>
        </Row>
        <Row>
          <Column>
            <H2>Standard Heading - H2</H2>
            <ul>
              <li>Size - 24px</li>
              <li>Line Height - 36px</li>
              <li>Color - <code>{colors.base.secondary}</code></li>
            </ul>
          </Column>
        </Row>
        <Row>
          <Column>
            <H3>Sub Heading - H3</H3>
            <ul>
              <li>Size - 16px</li>
              <li>Line Height - 24px</li>
              <li>Color - <code>{colors.base.secondary}</code></li>
            </ul>
          </Column>
        </Row>
        <Row>
          <Column>
            <P>Body Copy</P>
            <ul>
              <li>Size - 16px</li>
              <li>Line Height - 24px</li>
              <li>Color - <code>{colors.base.text}</code></li>
            </ul>
          </Column>
        </Row>
        <Row>
          <Column>
            <Small>Small Body Copy</Small>
            <ul>
              <li>Size - 14px</li>
              <li>Line Height - 18px</li>
              <li>Color - <code>{colors.base.text}</code></li>
            </ul>
          </Column>
        </Row>
      </div>
    </Base>
  ))
;