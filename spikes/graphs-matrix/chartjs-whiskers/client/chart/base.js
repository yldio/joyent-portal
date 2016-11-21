const buildArray = require('build-array');
const Chart = require('chart.js');
const React = require('react');
const whisker = require('../whisker');
whisker(Chart);

module.exports = React.createClass({
  ref: function(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  },
  componentDidMount: function() {
    const {
      datasets = [],
      labels = 0,
      stacked = false,
      xAxe = false,
      yAxe = false,
      legend = false,
      max = 100,
      min = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels).map((v, i) => '')
      : labels;

    this._chart = new Chart(this._refs.component, {
      type: 'whisker',
      responsive: true,
      options: {
        scales: {
          xAxes: [{
            barPercentage: 1.0,
            categoryPercentage: 1.0
          }],
          yAxes: [{
            ticks: {
              min: min,
              max: max
            }
          }]
        },
        legend: {
          display: true
        }
      },
      data: {
        labels: _labels,
        datasets: datasets
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    const {
      datasets = [],
      labels = 0
    } = this.props;
    this._chart.data.datasets = datasets;
    this._chart.data.labels = buildArray(labels).map((v, i) => '');
    this._chart.update(0);
  },
  render: function() {
    return (
      <canvas
        ref={this.ref('component')}
        width='400'
        height='400'
      />
    );
  }
});
