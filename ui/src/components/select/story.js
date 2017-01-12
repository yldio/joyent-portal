const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Select = require('./');

storiesOf('Select', module)
  .add('Default', () => (
    <Select label='example select'>
      <option>Apple</option>
      <option>Banana</option>
      <option>Pear</option>
      <option>Orange</option>
    </Select>
  ))
  .add('multiple', () => (
    <Select label='example multiple select' multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Select>
  ));