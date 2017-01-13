const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  MetricBody,
  MetricCloseButton,
  MetricHeader,
  MetricSelect,
  MetricSettingsButton,
  MetricTitle,
  MetricView
} = require('./');

const onButtonClick = () => {};

storiesOf('Metric', module)
  .add('Metric', () => (
    <Base>
      <MetricView>
        <MetricHeader>
          <MetricTitle>Aggregated CPU usage</MetricTitle>
          <MetricSelect>
            <option selected>6 hours</option>
            <option>12 hours</option>
            <option>24 hours</option>
            <option>Two days</option>
          </MetricSelect>
          <MetricSettingsButton>Settings</MetricSettingsButton>
          <MetricCloseButton onClick={onButtonClick} />
        </MetricHeader>
        <MetricBody />
      </MetricView>
    </Base>
  ));
