import React from 'react';
import { storiesOf } from '@kadira/storybook';
import withReadme from 'storybook-readme/with-readme';
import Button from './';
import README from './readme.md';

storiesOf('Button', module)
  .add('With text', withReadme(README, () => (
    <Button>
      Inspire the lazy
    </Button>
  ))).add('Secondary', withReadme(README, () => (
    <Button secondary>
      Inspire the brave
    </Button>
  ))).add('Tertiary', withReadme(README, () => (
    <Button tertiary>
      Inspire the tertiary
    </Button>
  ))).add('Disabled', withReadme(README, () => (
    <Button disabled>
      Inspire the liars
    </Button>
  ))).add('Anchor', withReadme(README, () => (
    <Button href='#'>
      Inspire the anchor
    </Button>
  )));
