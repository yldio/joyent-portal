const first = require('lodash.first');
const get = require('lodash.get');
const buildArray = require('build-array');
const Chart = require('./base');
const React = require('react');

const colors = {
  perc: 'rgba(54, 74, 205, 0.2)',
  alt: 'rgba(245, 93, 93, 0.2)'
};

module.exports = ({
  data = [],
  windowSize,
  aggregate = false,
  name = 'mem',
  max = 100
}) => {
  const datasets = [{
    label: name,
    backgroundColor: colors.perc,
    altBackgroundColor: colors.alt,
    data: buildArray(windowSize).map((v, i) => {
      const sample = get(data, `[${i}].perc`, {
        firstQuartile: 0,
        thirdQuartile: 0,
        median: 0,
        max: 0,
        min: 0
      });

      return Object.keys(sample).reduce((sum, name) => {
        // from bytes to mb
        return {
          ...sum,
          [name]: (sample[name] > 0)
            ?  sample[name] / 1000000
            : sample[name]
        };
      }, {});
    }).reverse()
  }];

  return (
    <Chart
      datasets={datasets}
      stacked={aggregate}
      labels={first(datasets).data.length}
      legend={true}
      max={max/1000000}
    />
  );
};

