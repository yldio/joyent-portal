import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Complex from './data-sets/complex';
import LineMetric from './';

storiesOf('Metric Line', module)
  .add('Multi', () => (
    <LineMetric
      dataSets={Complex}
      colored
      type="random"/>
  ));
