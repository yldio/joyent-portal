import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from './';

storiesOf('Button', module)
  .add('With text', () => (
    <Button>
      Inspire the lazy
    </Button>
  )).add('Secondary', () => (
    <Button secondary>
      Inspire the brave
    </Button>
  )).add('Disabled', () => (
    <Button disabled>
      Inspire the liars
    </Button>
  )).add('Anchor', () => (
    <Button href='#'>
      Inspire the anchor
    </Button>
  ));
