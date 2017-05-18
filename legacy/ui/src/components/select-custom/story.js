import SelectCustom  from './';
import { selectData } from '../../shared/fake-data';
import { storiesOf } from '@kadira/storybook';
import React from 'react';

storiesOf('Select Custom', module)
  .add('Default', () => (
    <SelectCustom
      label='This is the label'
      onChange={function noop() {}}
      options={selectData}
    />
  ))
  .add('Multiple', () => (
    <SelectCustom
      label='This is the label'
      multi
      onChange={function noop() {}}
      options={selectData}
    />
  ));
