import moment from 'moment';

export default  {
  // Create a fixed width
  responsive: false,
  elements: {
    // Remove dots on data points
    point: {
      radius: 0
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
        beginAtZero: true
      }
    }]
  }
};
