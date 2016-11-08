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

const EpochGraph = React.createClass({
  componentWillMount: function() {
    const bar = new Bar({
      el: this._refs.component,
      data
    })
    type: 'time.bar',
    data: barChartData
  },
  render: function() {
    // const {
    //   data = []
    // } = this.props;
    //
    // const cpu = data.map((d) => Math.floor(d.cpu));
    // const datatime = data.map((d, i) => i);
    //
    // const graphTypes = [{
    //   type: 'scatter',
    //   mode: 'lines+markers'
    // }, {
    //   type: 'bar'
    // }];
    //
    // const graphs = graphTypes.map((graphType, i) => {
    //   const data = {
    //     type: graphType.type,
    //     mode: graphType.mode,
    //     x: datatime,
    //     y: cpu
    //   };
    //
    //   const layout = {
    //     barmode: graphType.mode
    //   }
    //
    //   return (
    //     <Plotly
    //       key={i}
    //       layout={layout}
    //       data={[data]}
    //     />
    //   );
    // });
    //
    // return (
    //   <div>
    //     {graphs}
    //   </div>
    // )
  }
});

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(mapStateToProps)(EpochGraph);
