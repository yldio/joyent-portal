const React = require('react');
const Plotly = require('plotly.js');

const Plot = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    xdata: React.PropTypes.object,
    ydata: React.PropTypes.object,
    type: React.PropTypes.string,
    mode: React.PropTypes.string,
  },

  componentDidMount: function() {
    const {
      name,
      xData,
      yData,
      type = 'scatter',
      mode = 'markers'
    } = this.props;

    Plotly.newPlot(name, [{
      x: xData,
      y: yData,
      mode,
      type
    }], {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
  },

  render: function() {
    const {
      name
    } = this.props

    return (
      <div id={name}></div>
    );
  }
});

module.exports = Plot;
