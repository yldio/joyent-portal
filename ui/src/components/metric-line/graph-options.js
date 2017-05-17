import moment from 'moment';

const getFriendlyTime = (time) => `${moment.unix(time).format('MM-DD-YY')}`;

const scales = {
  xAxes: [{
    type: 'linear',
    position: 'bottom',
    ticks: {
      userCallback: (item) => getFriendlyTime(item)
    },
    scaleLabel: {
      display: true,
      labelString: 'Date'
    }
  }],
  yAxes: [{
//    stacked: true,
    scaleLabel: {
      display: true,
      labelString: 'CPU'
    },
    ticks: {}
//    ticks: {
//      userCallback: (item) => item,
//      max: 1200000000,
//      min: 0
//    }
  }]
};

const tooltips = (data) => ({
  enabled: true,
  mode: 'label',
  intersect: true,
  position: 'nearest',
  callbacks: {
    beforeLabel: item => {
      const labelData = data.filter((s, i) => item.datasetIndex === i);
      return `Measure: ${labelData[0].data.label}`;
    },
    label: tooltipItem =>
      `${tooltipItem.yLabel} CPU`,
    title: tooltipItem =>
      `Data: ${getFriendlyTime(tooltipItem[0].xLabel)}`
  }
});

const elements = {
  // Remove dots on data points
  point: {
    radius: 0
  }
};

export default (data) => ({
  responsive: true,
  elements,
  tooltips: tooltips(data),
  scales
});
