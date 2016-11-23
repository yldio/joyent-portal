const pretty = require('prettysize');
const buildArray = require('build-array');
const Chart = require('./base');
const React = require('react');

const colors = {
  user: 'rgb(255, 99, 132)',
  sys: 'rgb(255, 159, 64)'
};

module.exports = ({
  data = [],
  windowSize
}) => {
  const datasets = [{
    label: 'disk',
    backgroundColor: 'rgb(255, 159, 64)',
    data: buildArray(windowSize).map((v, i) => {
      return data[i] ? (data[i].total - data[i].free) : 0;
    })
  }];

  const labels = buildArray(windowSize).map((v, i) => {
    return data[i] ? pretty(datasets[0].data[i]) : '';
  });

  return (
    <Chart
      datasets={datasets}
      labels={labels}
      legend={true}
    />
  );
};

