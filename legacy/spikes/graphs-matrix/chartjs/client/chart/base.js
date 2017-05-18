const buildArray = require('build-array');
const Chart = require('chart.js');
const React = require('react');

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
      legend = false
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels).map((v, i) => '')
      : labels;

    this._chart = new Chart(this._refs.component, {
      type: 'bar',
      stacked: stacked,
      responsive: true,
      options: {
        scales: {
          xAxes: [{
            display: xAxe,
            stacked: stacked
          }],
          yAxes: [{
            display: yAxe,
            stacked: stacked
          }]
        },
        legend: {
          display: legend
        }
      },
      data: {
        labels:
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
