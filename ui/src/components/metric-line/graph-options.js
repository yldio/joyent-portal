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
    ticks: {
//      userCallback: (item) => item,
//      max: 1200000000,
//      min: 0
    }
  }]
};

const tooltips = {
	enabled: true,
		mode: 'label',
    intersect: true,
		position: 'nearest',
		callbacks: {
      label: tooltipItem =>
        `${tooltipItem.yLabel} CPU`,
      title: tooltipItem =>
      `Date: ${moment.unix(tooltipItem[0].xLabel).format('MM-DD-YY')}`,
    }
};

const elements = {
  // Remove dots on data points
  point: {
    radius: 0
  }
};

export default  {
  responsive: true,
  elements,
  tooltips,
  scales
};
