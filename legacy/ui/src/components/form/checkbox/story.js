import { storiesOf } from '@kadira/storybook';
import React from 'react';
import FormMeta from '../meta';
import FormGroup from '../group';
import Checkbox from '../checkbox';
import Label from '../label';
import Row from '../../row';
import Column from '../../column';

storiesOf('Checkbox', module)
  .add('Default', () => (
    <FormGroup>
      <Checkbox />
      <Label>Check this out!</Label>
    </FormGroup>
  ))
  .add('Checked', () => (
    <FormGroup>
      <Checkbox checked />
      <Label>Check this out!</Label>
    </FormGroup>
  ))
  .add('Disabled', () => (
    <FormGroup>
      <Checkbox disabled />
      <Label>Check this out!</Label>
    </FormGroup>
  ))
  .add('With label before', () => (
    <FormGroup>
      <Label>Check this out!</Label>
      <Checkbox />
    </FormGroup>
  ))
  .add('With warning', () => (
    <div>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
        {/* eslint-enable object-curly-newline */}
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup warning='Unexpected group warning!'>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left warning>
          Unexpected children warning!
        </FormMeta>
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left warning='Unexpected inline warning!' />
      </FormGroup>
    </div>
  ))
  .add('With error', () => (
    <div>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{error: 'Unexpected meta error!'}}>
        {/* eslint-enable object-curly-newline */}
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup error='Unexpected group error!'>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left error>
          Unexpected children error!
        </FormMeta>
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left error='Unexpected inline error!' />
      </FormGroup>
    </div>
  ))
  .add('With success', () => (
    <div>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{success: 'Unexpected meta success!'}}>
        {/* eslint-enable object-curly-newline */}
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup success='Unexpected group success!'>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left />
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left success>
          Unexpected children success!
        </FormMeta>
      </FormGroup>
      <FormGroup>
        <Checkbox />
        <Label>Check this out!</Label>
        <FormMeta left success='Unexpected inline success!' />
      </FormGroup>
    </div>
  ))
  .add('With label before with success', () => (
    <FormGroup>
      <Label>Check this out!</Label>
      <Checkbox />
      <FormMeta success left>
        Thanks for ticking, you are a star!
      </FormMeta>
    </FormGroup>
  ))
  .add('Multiple checkboxes with meta', () => (
    <Row>
      <Column md={6}>
        <FormGroup>
          <Row>
            <Column>
              <Label>Check this out!</Label>
              <Checkbox />
            </Column>
          </Row>
          <Row>
            <Column>
              <FormMeta success left>
                Thanks for ticking, you are a star!
              </FormMeta>
            </Column>
          </Row>
        </FormGroup>
      </Column>
      <Column md={6}>
        <FormGroup>
          <Row>
            <Column>
              <FormMeta success left>
                Thanks for ticking, you are a star!
              </FormMeta>
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Check this out!</Label>
              <Checkbox />
            </Column>
          </Row>
        </FormGroup>
      </Column>
    </Row>
  ));
