import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Complex from './data-sets/complex';
import Basic from './data-sets/basic';

import LineMetric from './';

storiesOf('Metric Line', module)
  .add('Basic', () => (
    <LineMetric
      colored
      dataSets={Basic} />
  )).add('Multi', () => (
    <LineMetric
      dataSets={Complex} />
  ))
