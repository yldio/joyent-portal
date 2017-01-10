const buildArray = require('build-array');
const Chart = require('chart.js');
const React = require('react');
const whisker = require('chartjs-chart-box-plot');

whisker(Chart);

class Graph extends React.Component {
  componentDidMount() {
    const {
      data = [],
      labels = 0,
      max = 100,
      min = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels || data.length).map((v, i) => '')
      : labels;

    this._chart = new Chart(this._refs.component, {
      type: 'whisker',
      responsive: true,
      maintainAspectRatio: true,
      options: {
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 1.0,
            categoryPercentage: 1.0
          }],
          yAxes: [{
            display: false,
            ticks: {
              min: min,
              max: max
            }
          }]
        },
        legend: {
          display: false
        }
      },
      data: {
        labels: _labels,
        datasets: [{
          data
        }]
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      data = [],
      labels = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels || data.length).map((v, i) => '')
      : labels;

    this._chart.data.datasets = [{
      data
    }];

    this._chart.data.labels = _labels;
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
        height='72'
        ref={this.ref('component')}
        width='157'
      />
    );
  }
}

Graph.propTypes = {
  data: React.PropTypes.array,
  labels: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number
};

module.exports = Graph;
