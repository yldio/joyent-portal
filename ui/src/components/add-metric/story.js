const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Row = require('../row');
const Column  = require('../column');
const AddMetric = require('./');

const {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
} = AddMetric;

storiesOf('Add Metric', module)
  .add('Add Metric', () => (
    <Base>
      <Row>
        <Column>
          <AddMetricTile>
            <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
            <AddMetricDescription>
              CPU usages accross all of the CPU cores.
            </AddMetricDescription>
            <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
            <AddMetricButton>Add</AddMetricButton>
          </AddMetricTile>
        </Column>
      </Row>
    </Base>
  ))
  .add('Added Metric', () => (
    <Base>
      <Row>
        <Column>
          <AddMetricTile>
            <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
            <AddMetricDescription>
              CPU usages accross all of the CPU cores.
            </AddMetricDescription>
            <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
            <AddMetricButton disabled>Added</AddMetricButton>
          </AddMetricTile>
        </Column>
      </Row>
    </Base>
  ));
