const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Select = require('./');
const Base = require('../base');


storiesOf('Select', module)
  .add('Default', () => (
    <Base>
      <Select label='Data Centers' placeholder='Select Location'>
        <option value="1">Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ))
  .add('disabled', () => (
    <Base>
      <Select
        disabled
        label='Data Centers'
        placeholder='Select Location'
        value='2'
      >
        <option value="1">Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ))
  .add('selected', () => (
    <Base>
      <Select
        label='Data Centers'
        placeholder='Select Location'
        value='2'
      >
        <option value="1">Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ))
  .add('multiple', () => (
    <Base>
      <Select label='Data Centers' multiple>
        <option>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ))
  .add('warning', () => (
    <Base>
      <Select label='Data Centers' warning='Be warned!'>
        <option>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ))
  .add('error', () => (
    <Base>
      <Select error='How dare you?!' label='Data Centers'>
        <option>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </Base>
  ));
