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
    windowSize: state.windowSize,
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

const Row = connect(
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
      data = {},
      windowSize
    } = this.props;

    const charts = Object.keys(data).map((key, i, arr) => {
      if (!Chart[key]) {
        return null;
      }

      const chart = React.createElement(Chart[key], {
        data: data[key],
        windowSize
      });

      return (
        <div key={key} className={`col-xs-${12 / arr.length}`}>
          {chart}
        </div>
      );
    });

    return (
      <div className='row'>
        {charts}
      </div>
    );
  }
}));

module.exports = ({
  rows
}) => {
  const _rows = buildArray(rows).map((v, i) => {
    return (
      <Row id={i} key={i} />
    );
  });

  return (
    <div>
      {_rows}
    </div>
  );
};
