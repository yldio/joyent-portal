const React = require('react');

const buildArray = require('build-array');
const Chart = require('chart.js');
const whisker = require('chartjs-chart-box-plot');

whisker(Chart);

class MiniMetric extends React.Component {
  componentDidMount() {
    const {
      datasets = [],
      labels = 0,
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
  }
  componentWillReceiveProps(nextProps) {
    const {
      datasets = [],
      labels = 0
    } = this.props;

    this._chart.data.datasets = datasets;
    this._chart.data.labels = buildArray(labels).map((v, i) => '');
    this._chart.update(0);
  }
  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }
  render() {
    return (
      <canvas
        height='400'
        ref={this.ref('component')}
        width='400'
      />
    );
  }
}

MiniMetric.propTypes = {
  datasets: React.PropTypes.array,
  labels: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
};

module.exports = MiniMetric;
