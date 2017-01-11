const React = require('react');
const {
  storiesOf
} = require('@kadira/storybook');

const Button = require('./');

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
    <div>
      <Button href='#'>
        Inspire the anchor
      </Button>
    </div>
  ));