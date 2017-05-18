import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { H1 } from '../base-elements';
import Input from '../form/input';

storiesOf('Baseline', module)
  .add('margin-left', () => (
    <H1 marginLeft='2'>Heyo</H1>
  ))
  .add('padding', () => (
    <Input padding='3' />
  ));
