import moment from 'moment';

const scales = {
  xAxes: [{
    type: 'linear',
    position: 'bottom',
    ticks: {
      userCallback: (item) => `${moment.unix(item).format('MM-DD-YY')}`
    },
    scaleLabel: {
      display: true,
      labelString: 'Date'
    }
  }],
  yAxes: [{
    stacked: true,
    scaleLabel: {
      display: true,
      labelString: 'CPU'
    },
    ticks: {
//      userCallback: (item) => item,
      max: 1200000000,
      min: 0
    }
  }]
};

const tooltips = () => ({
	enabled: true,
	mode: 'single',
	callbacks: {
		label: (tooltipItems, data) => `${tooltipItems.yLabel} : ${tooltipItems.xLabel} Files`
	}
});

const elements = {
  // Remove dots on data points
  point: {
    radius: 0
  }
};

export default  {
  responsive: true,
  elements,
//  tooltips,
//  scales
};
