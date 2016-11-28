const pretty = require('prettysize');
const buildArray = require('build-array');
const Chart = require('./base');
const React = require('react');

const colors = {
  perc: 'rgba(54, 74, 205, 0.2)',
  alt: 'rgba(245, 93, 93, 0.2)'
};

module.exports = ({
  data = [],
  windowSize
}) => {
  const datasets = [{
    label: 'disk',
    backgroundColor: colors['perc'],
    altBackgroundColor: colors['alt'],
    data: buildArray(windowSize).map((v, i) => ((data[i] || {})['perc'] || { firstQuartile: 0, thirdQuartile: 0, median: 0, max: 0, min: 0 })).reverse()
  }];

  return (
    <Chart
      datasets={datasets}
      labels={datasets[0].data.length}
      legend={true}
    />
  );
};

