const ReactRedux = require('react-redux');
const React = require('react');
const Plot = require('./plot');

const {
  connect
} = ReactRedux;

const PlotlyGraph = React.createClass({
  render: function() {
    const {
      data = []
    } = this.props;

    const cpu = data.map((d) => Math.floor(d.cpu));
    const datatime = data.map((d, i) => i);

    const graphTypes = [{
      type: 'scatter',
      mode: 'lines+markers'
    }, {
      type: 'scatter',
      mode: 'line'
    }, {
      type: 'bar'
    }];

    const graphs = graphTypes.map((graphType, i) => {
      console.log(cpu, datatime);
      return (
        <Plot
          key={i}
          name={`plot-${i}`}
          xData={datatime}
          yData={cpu}
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
});

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(mapStateToProps)(PlotlyGraph);
