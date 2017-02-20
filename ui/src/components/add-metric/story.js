import { storiesOf } from '@kadira/storybook';
import React from 'react';

import {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
}  from './';

storiesOf('Add Metric', module)
  .add('Add Metric', () => (
    <AddMetricTile>
      <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
      <AddMetricDescription>
        CPU usages accross all of the CPU cores.
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
      <AddMetricButton>Add</AddMetricButton>
    </AddMetricTile>
  ))
  .add('Added Metric', () => (
    <AddMetricTile>
      <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
      <AddMetricDescription>
        CPU usages accross all of the CPU cores.
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
      <AddMetricButton disabled>Added</AddMetricButton>
    </AddMetricTile>
  ));
