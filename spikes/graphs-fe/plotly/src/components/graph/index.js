const React = require('react');
const Plot = require('./plot');
const localData = require('../../../lib/data');

const Graph = React.createClass({

  getInitialState: function() {
    return this.fetchData(this.props)
  },

  fetchData: function(data = localData) {
    let datetime = [];
    let cpu = [];

    localData.data.forEach( d => {
      datetime.push(d[0]);
      cpu.push(d[1]);
    })

    return {
      data: localData,
      cpu,
      datetime
    }
  },

  render: function() {

    const graphTypes = [
      {
        type: 'scatter',
        mode: 'markers'
      },
      {
        type: 'scatter',
        mode: 'line'
      },
      {
        type: 'bar'
      }
    ]

    const graphs = graphTypes.map( (graphType, i) => {
      return (
        <Plot
          name={`plot-${i}`}
          xData={this.state.datatime}
          yData={this.state.cpu}
          type={graphType.type}
          mode={graphType.mode}
        />
      );
    });

    return (
      <div>
        {graphs}
      </div>
    )
  }
})

module.exports = Graph;
