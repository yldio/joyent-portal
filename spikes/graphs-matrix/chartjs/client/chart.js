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
  fromData: function(data) {
    return (data || []).map((d) => {
      return d.cpu;
    });
  },
  componentDidMount: function() {
    const {
      data = [],
      bg,
      border
    } = this.props;

    const bars = this.fromData(data);

    this._chart = new Chart(this._refs.component, {
      type: 'bar',
      options: {
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      },
      data: {
        labels: buildArray(bars.length).map((v, i) => ''),
        datasets: [{
          borderWidth: 1,
          borderColor: border,
          backgroundColor: bg,
          data: bars
        }]
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    const {
      data = [],
      bg,
      border
    } = this.props;

    const bars = this.fromData(data);

    this._chart.data.labels = buildArray(bars.length).map((v, i) => '');
    this._chart.data.datasets[0].backgroundColor = bg;
    this._chart.data.datasets[0].borderColor = border;
    this._chart.data.datasets[0].data = bars;

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
