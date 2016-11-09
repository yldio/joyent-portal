const React = require('react');
const buildArray = require('build-array');
const ReactRedux = require('react-redux');
const Chart = require('./chart');
const actions = require('./actions');

const {
  connect
} = ReactRedux;

const {
  subscribe,
  unsubscribe
} = actions;

const mapStateToProps = (state, ownProps) => {
  return {
    data: state[ownProps.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subscribe: () => {
      return dispatch(subscribe(ownProps.id));
    },
    unsubscribe: () => {
      return unsubscribe(ownProps.id);
    }
  }
};

const Graph = connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.createClass({
  componentWillMount: function() {
    this.props.subscribe();
  },
  componentWillUnmount: function() {
    this.props.unsubscribe();
  },
  render: function() {
    const {
      data = []
    } = this.props;

    const median = data.reduce((sum, v) => (sum + v.cpu), 0) / data.length;

    const bg = median > 50
      ? 'rgba(205, 54, 54, 0.3)'
      : 'rgba(54, 74, 205, 0.3)';

    const shadow = median > 50
      ? 'inset 0 1px 0 0 rgba(248, 51, 51, 0.5)'
      : 'inset 0 1px 0 0 rgba(54, 73, 205, 0.5)';

    return (
      <Chart
        data={this.props.data}
        bg={bg}
        shadow={shadow}
        median={median}
      />
    );
  }
}));

module.exports = ({
  x,
  y
}) => {
  const m = buildArray(y).map((v, i) => {
    const m = buildArray(x).map((v, y) => {
      const id = `${i}${y}`;
      return (
        <div className={`col-xs-${12/x}`}>
          <Graph key={id} id={id} />
        </div>
      );
    });

    return (
      <div className='row'>
        {m}
      </div>
    );
  });

  return (
    <div>
      {m}
    </div>
  );
};
