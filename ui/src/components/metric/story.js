const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  MetricGraph,
  MetricCloseButton,
  MetricHeader,
  MetricSelect,
  MetricSettingsButton,
  MetricTitle,
  MetricView
} = require('./');

const MetricData = require('./metric-data');

const onButtonClick = () => {};
const onMetricSelect = () => {};

const hour = 60; // in minutes - for moment
const sixHours = 6*hour;
const twelveHours = 12*hour;
const oneDay = 24*hour;
const twoDays = 48*hour;

const withinRange = (
  value,
  newMin,
  newMax,
  precision = 2,
  oldMin = 0,
  oldMax = 100
) => {
  const normalisedValue = value-oldMin;
  const newRange = newMax-newMin;
  const oldRange = oldMax-oldMin;
  const newValue = newMin + normalisedValue*newRange/oldRange;
  return newValue.toFixed(2);
};

const percentageMetricData = MetricData;
const kbMetricData = MetricData.map(m => {
  return {
    firstQuartile: withinRange(m.firstQuartile, 1.55, 2.0),
    thirdQuartile: withinRange(m.thirdQuartile, 1.55, 2.0),
    median: withinRange(m.median, 1.55, 2.0),
    max: withinRange(m.max, 1.55, 2.0),
    min: withinRange(m.min, 1.55, 2.0)
  };
});

storiesOf('Metric', module)
  .add('Metric', () => (
    <Base>
      <MetricView>
        <MetricHeader>
          <MetricTitle>Aggregated CPU usage</MetricTitle>
          <MetricSelect onChange={onMetricSelect} value={sixHours}>
            <option value={sixHours}>6 hours</option>
            <option value={twelveHours}>12 hours</option>
            <option value={oneDay}>24 hours</option>
            <option value={twoDays}>Two days</option>
          </MetricSelect>
          <MetricSettingsButton onClick={onButtonClick}>
            Settings
          </MetricSettingsButton>
          <MetricCloseButton onClick={onButtonClick} />
        </MetricHeader>
        <MetricGraph
          data={percentageMetricData}
          duration={sixHours}
          yMax={100}
          yMeasurement='%'
          yMin={0}
        />
      </MetricView>
      <MetricView>
        <MetricHeader>
          <MetricTitle>Aggregated CPU usage</MetricTitle>
          <MetricSelect onChange={onMetricSelect} value={twelveHours}>
            <option value={sixHours}>6 hours</option>
            <option value={twelveHours}>12 hours</option>
            <option value={oneDay}>24 hours</option>
            <option value={twoDays}>Two days</option>
          </MetricSelect>
          <MetricSettingsButton onClick={onButtonClick}>
            Settings
          </MetricSettingsButton>
          <MetricCloseButton onClick={onButtonClick} />
        </MetricHeader>
        <MetricGraph
          data={kbMetricData}
          duration={twelveHours}
          yMax={2.0}
          yMeasurement='kb'
          yMin={1.55}
        />
      </MetricView>
      <MetricView>
        <MetricHeader>
          <MetricTitle>Aggregated CPU usage</MetricTitle>
          <MetricSelect onChange={onMetricSelect} value={oneDay}>
            <option value={sixHours}>6 hours</option>
            <option value={twelveHours}>12 hours</option>
            <option value={oneDay}>24 hours</option>
            <option value={twoDays}>Two days</option>
          </MetricSelect>
          <MetricSettingsButton onClick={onButtonClick}>
            Settings
          </MetricSettingsButton>
          <MetricCloseButton onClick={onButtonClick} />
        </MetricHeader>
        <MetricGraph
          data={percentageMetricData}
          duration={oneDay}
          yMax={100}
          yMeasurement='%'
          yMin={0}
        />
      </MetricView>
    </Base>
  ));
