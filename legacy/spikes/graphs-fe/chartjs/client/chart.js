const buildArray = require('build-array');
const Chart = require('chart.js');
const ReactRedux = require('react-redux');
const React = require('react');

const {
  connect
} = ReactRedux;

const Component = React.createClass({
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
    const bars = this.fromData(this.props.data);

    this._chart = new Chart(this._refs.component, {
      type: 'bar',
      data: {
        labels: buildArray(bars.length).map((v, i) => ''),
        datasets: [{
          data: bars
        }]
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    const bars = this.fromData(this.props.data);

    this._chart.data.labels = buildArray(bars.length).map((v, i) => '');
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

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(
  mapStateToProps
)(Component);
