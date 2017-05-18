import { storiesOf } from '@kadira/storybook';
import MetricData from '../metric-data';
import React from 'react';

import {
  MetricGraph,
  MetricCloseButton,
  MetricHeader,
  MetricSelect,
  MetricSettingsButton,
  MetricTitle,
  MetricView
} from '../';

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
  oldMin = 0,
  oldMax = 100,
  precision = 2
) => {
  const normalisedValue = value - oldMin;
  const newRange = newMax - newMin;
  const oldRange = oldMax - oldMin;
  const newValue = newMin + ((normalisedValue * newRange) / oldRange);
  return newValue.toFixed(2);
};

const kbMetricValues = MetricData.values.map((m) => ({
  ...m,
  // eslint-disable-next-line max-len
  firstQuartile: withinRange(m.firstQuartile, 0, 100, MetricData.min, MetricData.max),
  // eslint-disable-next-line max-len
  thirdQuartile: withinRange(m.thirdQuartile, 0, 100, MetricData.min, MetricData.max),
  median: withinRange(m.median, 0, 100, MetricData.min, MetricData.max),
  max: withinRange(m.max, 0, 100, MetricData.min, MetricData.max),
  min: withinRange(m.min, 0, 100, MetricData.min, MetricData.max)
}));

const kbMetricData = {
  ...MetricData,
  min: 0,
  max: 100,
  values: kbMetricValues
};

storiesOf('Metric', module)
  .add('Metric', () => (
    <div>
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
          axes
          data={MetricData}
          yMeasurement='bytes'
          width={940}
          height={262}
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
          axes
          data={kbMetricData}
          yMeasurement='%'
          width={940}
          height={262}
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
          axes
          data={MetricData}
          yMeasurement='bytes'
          width={940}
          height={262}
        />
      </MetricView>
    </div>
  ));
