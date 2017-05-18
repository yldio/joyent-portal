// injects into `window` (ikr)
require('epoch-charting');

const ReactRedux = require('react-redux');
const React = require('react');

const {
  Time: {
    Bar
  }
} = window.Epoch;

const {
  connect
} = ReactRedux;

const style = {
  height: '220px'
};

module.exports = React.createClass({
  ref: function(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  },
  fromData: function(data) {
    return (data || []).map((d) => {
      return {
        y: d.cpu,
        time: d.when
      };
    });
  },
  componentDidMount: function() {
    this.chart = new Bar({
      el: this._refs.component,
      type: 'time.bar',
      data: [{
        label: 'A',
        values: []
      }]
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.fromData(this.props.data).forEach((r) => this.chart.push([r]));
  },
  render: function() {
    const className = (this.props.median > 50)
      ? 'red'
      : 'blue';

    return (
      <div
        style={style}
        className={`epoch epoch-theme-default category20 ${className}`}
        ref={this.ref('component')}
      />
    );
  }
});