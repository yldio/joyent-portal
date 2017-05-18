const get = require('lodash.get');
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
  unsubscribe,
  getTree
} = actions;

const Job = React.createClass({
  componentWillMount: function() {
    this.props.subscribe(this.props.name);
  },
  componentWillUnmount: function() {
    this.props.unsubscribe(this.props.name);
  },
  render: function() {
    const {
      data,
      instances = [],
      name,
      windowSize
    } = this.props;

    if (!data) {
      return null;
    }

    if (instances.length < 2) {
      return null;
    }

    let max = 0;

    const charts = ['aggregate'].concat(instances.map((i) => {
      return `instances.${i}`;
    })).map((path) => {
      const set = data.mem.map((sample) => {
        const perc = get(sample, path);

        if (perc.max > max) {
          max = perc.max;
        }

        return {
          perc: perc,
          when: sample.when
        };
      });

      return {
        key: path,
        data: set,
        aggregate: path === 'aggregate',
        windowSize
      };
    }).map((ctx, i, arr) => {
      const chart = React.createElement(Chart.mem, {
        data: ctx.data,
        aggregate: ctx.aggregate,
        windowSize: ctx.windowSize,
        max: max,
        name: ctx.key
      });

      return (
        <div
          key={ctx.key}
          className={`col-xs-${12 / arr.length}`}
        >
          {chart}
        </div>
      );
    });

    return (
      <div>
        <p>{name}</p>
        <div className='row'>
          {charts}
        </div>
      </div>
    );
  }
});

const Jobs = React.createClass({
  componentWillMount: function() {
    this.props.getTree();
  },
  render: function() {
    const {
      subscribe,
      unsubscribe,
      tree = {},
      data = {},
      windowSize
    } = this.props;


    const jobs = Object.keys(tree).map((jobName) => {
      return (
        <Job
          key={jobName}
          windowSize={windowSize}
          data={data[jobName]}
          instances={Object.keys(tree[jobName])}
          subscribe={subscribe}
          unsubscribe={unsubscribe}
          name={jobName}
        />
      );
    })

    return (
      <div>
        {jobs}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
    data: state.data,
    windowSize: state.windowSize
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subscribe: (name) => {
      return dispatch(subscribe(name));
    },
    unsubscribe: (name) => {
      return dispatch(unsubscribe(name));
    },
    getTree: () => {
      return dispatch(getTree());
    }
  }
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Jobs);
