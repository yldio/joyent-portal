import { storiesOf } from '@kadira/storybook';
import Modal from './';
import { Close } from '../icons';
import React from 'react';

storiesOf('Modal', module)
  .add('Default', () => (
    <Modal>
      <Close />
      <h2>This is the Modal</h2>
    </Modal>
  ));
