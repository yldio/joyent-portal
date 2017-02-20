import { storiesOf } from '@kadira/storybook';
import Notificaton from './';
import React from 'react';

storiesOf('Notificaton', module)
  .add('Default', () => (
    <Notificaton>
      <span>This is the default content</span>
    </Notificaton>
  ))
  .add('Success', () => (
    <Notificaton type='success' >
      <span>This is a success notification that is closable</span>
    </Notificaton>
  ))
  .add('Alert', () => (
    <Notificaton type='alert'>
      <span>This is the alert content</span>
    </Notificaton>
  ));
