const flatten = require('lodash.flatten');
const { metricByIntervalSelector } = require('@state/selectors');
const moment = require('moment');
const test = require('ava');

const data = require('./metric-by-Interval-selector.json');

test('should ouput the right properties', (t) => {
  const stats = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  t.truthy(stats.start);
  t.truthy(stats.end);

  t.deepEqual(typeof stats.start, 'number');
  t.deepEqual(typeof stats.end, 'number');

  t.truthy(stats.end > stats.start);

  t.truthy(Array.isArray(stats.values));
  t.truthy(stats.values.every((value) => [
    'firstQuartile',
    'median',
    'thirdQuartile',
    'max',
    'min'
  ].every((key) => value[key])));
});

test('should respect order of records', (t) => {
  const stats = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  const valuesFromSource = data.map((record) => Number(record[1]));
  const valuesFromStats = flatten(stats.__intervals.map((sample) => {
    return sample.values.map(r => r.v)
  }));

  t.deepEqual(valuesFromStats, valuesFromSource);
});

test('should respect the intervals', (t) => {
  const stats = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  t.truthy(stats.__intervals.every((sample, i, intervals) => {
    const previous = i > 0
      ? intervals[i - 1]
      : null;

    const isAfterPrevious = previous
      ? moment(previous.end).isSame(moment(sample.start))
      : true;

    const interval = moment(sample.end).diff(moment(sample.start), 'seconds');

    return (
      (interval === 30) &&
      isAfterPrevious
    );
  }));
});

test('should respect the intervals', (t) => {
  const stats = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  t.truthy(stats.__intervals.every((sample, i, intervals) => {
    const previous = i > 0
      ? intervals[i - 1]
      : null;

    const isAfterPrevious = previous
      ? moment(previous.end).isSame(moment(sample.start))
      : true;

    const interval = moment(sample.end).diff(moment(sample.start), 'seconds');

    return (
      (interval === 30) &&
      isAfterPrevious
    );
  }));
});

test('records should be within intervals', (t) => {
  const stats = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  t.truthy(stats.__intervals.every((sample) => {
    return sample.values.every((record) => (
      record.t.isSameOrAfter(sample.start) &&
      record.t.isSameOrBefore(sample.end)
    ))
  }));
});

test('different data chunks should produce almost the same stats', (t) => {
  const halfData = data.slice(Math.floor(data.length / 2), data.length);

  const stats1 = metricByIntervalSelector(data, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  const stats2 = metricByIntervalSelector(halfData, {
    duration: '10 minutes',
    interval: '30 seconds'
  });

  const matches = stats2.values.reduceRight((matches, value, i) => {
    const x = stats1.values.length - (stats2.values.length - i);
    const otherValue = stats1.values[x];

    const isEqual = Object.keys(value).every((k) => otherValue[k] === value[k]);
    return isEqual ? matches + 1 : matches
  }, 0);

  t.truthy(matches >= (stats2.values.length - 2));
});
