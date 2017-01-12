const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Toggle = require('./');

storiesOf('Toggle', module)
  .add('default', () => (
    <Toggle checked />
  ))
  .add('checked', () => (
    <Toggle
      defaultChecked
      options={[
        {
          label: 'Topology',
          checked: true
        },
        {
          label: 'List',
          checked: false
        }
      ]}
    />
  ))
  .add('no props', () => (
    <Toggle />
  ));