import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { colors } from '../../shared/constants';
import Column from '../column';
import Row from '../row';
import { H1, H2, H3, P, Small } from './';

storiesOf('Base Elements', module)
  .add('H1', () => (
    <H1>This is a H1</H1>
  ))
  .add('H2', () => (
    <H2>This is a H2</H2>
  ))
  .add('H3', () => (
    <H3>This is a H3</H3>
  ))
  .add('P', () => (
    <P>This is a P</P>
  ))
  .add('Small', () => (
    <Small>This is a Small</Small>
  ))
  .add('Style Guide', () => (
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
  ))
;
