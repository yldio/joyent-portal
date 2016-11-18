const buildArray = require('build-array');
const Chart = require('./base');
const React = require('react');

const colors = {
  user: 'rgb(255, 99, 132)',
  sys: 'rgb(255, 159, 64)',
  perc: 'rgba(54, 74, 205, 0.2)'
};

module.exports = ({
  data = {},
  windowSize
}) => {
  const datasets = ['perc'].map((key) => {
    return {
      label: key,
      backgroundColor: colors[key],
      data: buildArray(windowSize).map((v, i) => ((data[i] || {})[key] || { firstQuartile: 0, thirdQuartile: 0, median: 0, max: 0, min: 0 }))
    };
  });

  return (
    <Chart
      datasets={datasets}
      stacked={true}
      labels={datasets[0].data.length}
      legend={true}
    />
  );
};

