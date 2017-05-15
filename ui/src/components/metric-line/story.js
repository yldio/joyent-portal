import { storiesOf } from '@kadira/storybook';
import React from 'react';

import LineMetric from './';

storiesOf('Metric Line', module)
  .add('Line Single', () => (
    <LineMetric />
  ));
