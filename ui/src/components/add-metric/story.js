const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
} = require('./');

storiesOf('Add Metric', module)
  .add('Add Metric', () => (
    <Base>
      <AddMetricTile>
        <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
        <AddMetricDescription>
          CPU usages accross all of the CPU cores.
        </AddMetricDescription>
        <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
        <AddMetricButton>Add</AddMetricButton>
      </AddMetricTile>
    </Base>
  ))
  .add('Added Metric', () => (
    <Base>
      <AddMetricTile>
        <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
        <AddMetricDescription>
          CPU usages accross all of the CPU cores.
        </AddMetricDescription>
        <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
        <AddMetricButton disabled>Added</AddMetricButton>
      </AddMetricTile>
    </Base>
  ));
