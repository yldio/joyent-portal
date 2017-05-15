import moment from 'moment';

export default  {
  // Create a fixed width
  responsive: true,
  elements: {
    // Remove dots on data points
    point: {
      radius: 0
    }
  },
  tooltips: {
    callbacks: {
      label: (tooltipItems, data) => {
        console.log(data)
        return data.datasets[tooltipItems.datasetIndex].label;
      }
    }
  },
  scales: {
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
      scaleLabel: {
        display: true,
        labelString: 'CPU'
      },
      ticks: {
        userCallback: (item) => item,
        max: 120000000,
        min: 0
      }
    }]
  }
};
