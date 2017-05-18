const Rickshaw = require('rickshaw');
const ReactRedux = require('react-redux');
const React = require('react');
const style = require('./style.css');

const {
  connect
} = ReactRedux;

const {
  Graph
} = Rickshaw;

let i = 0;

const Component = React.createClass({
  ref: function(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  },
  fromData: function(data) {
    return (data || []).map((d, i) => {
      return {
        y: d.cpu,
        x: i
      };
    });
  },
  componentDidMount: function() {
    this._chart = new Graph({
      element: this._refs.component,
      renderer: 'bar',
      width: 500,
      height: 200,
      series: [{
        data: this.fromData(this.props.data)
      }]
    });

    this._chart.render();
  },
  componentWillReceiveProps: function(nextProps) {
    this._chart.series[0].data = this.fromData(this.props.data);
    this._chart.update();
  },
  render: function() {
    const {
      data = []
    } = this.props;

    const className = (data.length && data[data.length - 1].cpu > 50)
      ? style.red
      : style.blue;

    return (
      <div
        className={`${style.rickshaw_graph} ${className}`}
        ref={this.ref('component')}
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
