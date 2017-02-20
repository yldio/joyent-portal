import { storiesOf } from '@kadira/storybook';
import RangeSlider from './';
import React from 'react';

storiesOf('Range Slider', module)
  .add('Default', () => (
    <RangeSlider />
  ));
