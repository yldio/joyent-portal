const C3Graph = require('react-c3js').default;
const ReactRedux = require('react-redux');
const React = require('react');

const {
  connect
} = ReactRedux;

const Graph = React.createClass({
  render: function() {
    const {
      data = []
    } = this.props;

    const cpu = data.map((d) => Math.floor(d.cpu));
    const datatime = data.map((d, i) => i);

    const formattedData = {
      x: 'x',
      columns: [
        ['x'].concat(datatime),
        ['cpu'].concat(cpu)
      ]
    };

    return (
      <C3Graph
        data={formattedData}
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

module.exports = connect(mapStateToProps)(Graph);

