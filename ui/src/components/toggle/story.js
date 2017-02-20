import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Toggle from './';

storiesOf('Toggle', module)
  .add('default', () => (
    <Toggle checked />
  ))
  .add('checked', () => (
    <Toggle
      defaultChecked
      options={[{
        label: 'Topology',
        checked: true
      }, {
        label: 'List',
        checked: false
      }]}
    />
  ))
  .add('no props', () => (
    <Toggle />
  ));
