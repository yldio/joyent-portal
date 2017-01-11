const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const RadioGroup = require('./');
const Radio = require('./item');


storiesOf('Radio Group', module)
  .add('Default', () => (
    <Base>
      <RadioGroup>
        <Radio name='hello' value='default'>
          Video killed the radio star
        </Radio>
        <Radio name='hello' value='fancy'>
          Video killed the radio star
        </Radio>
        <Radio name='hello' value='none'>
          Video killed the radio star
        </Radio>
      </RadioGroup>
    </Base>
  ));