const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Toggle = require('./');

storiesOf('Toggle', module)
  .add('default', () => (
    <Base>
      <Toggle checked />
    </Base>
  ))
  .add('checked', () => (
    <Base>
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
    </Base>
  ))
  .add('no props', () => (
    <Base>
      <Toggle />
    </Base>
  ));