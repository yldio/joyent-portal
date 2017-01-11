const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  selectData
} = require('../../shared/fake-data');

const SelectCustom = require('./');

storiesOf('Select Custom', module)
  .add('Default', () => (
    <SelectCustom
      label="This is the label"
      onChange={function noop() {}}
      options={selectData}
    />
  ))
  .add('Multiple', () => (
    <SelectCustom
      label="This is the label"
      multi
      onChange={function noop() {}}
      options={selectData}
    />
  ));