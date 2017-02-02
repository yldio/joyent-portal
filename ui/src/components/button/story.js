const React = require('react');
const {
  storiesOf
} = require('@kadira/storybook');

const Button = require('./');
const Base = require('../base');

storiesOf('Button', module)
  .add('With text', () => (
    <Base>
      <Button>
        Inspire the lazy
      </Button>
    </Base>
  )).add('Secondary', () => (
    <Base>
      <Button secondary>
        Inspire the brave
      </Button>
    </Base>
  )).add('Disabled', () => (
    <Base>
      <Button disabled>
        Inspire the liars
      </Button>
    </Base>
  )).add('Anchor', () => (
    <Base>
      <Button href='#'>
        Inspire the anchor
      </Button>
    </Base>
  ));