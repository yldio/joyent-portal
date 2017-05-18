const debounce = require('lodash.debounce');
const ReactRedux = require('react-redux');
const Infinite = require('react-infinite');
const actions = require('./actions');
const React = require('react');

const {
  connect
} = ReactRedux;

const {
  fetch,
  filter
} = actions;

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => {
      return dispatch(fetch());
    },
    filter: (payload) => {
      return dispatch(filter(payload));
    }
  }
};

const styles = {
  item: {
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
    border: 'solid 1px #d8d8d8',
    marginBottom: '20px',
    padding: '20px',
    clear: 'both'
  },
  itemImage: {
    width: '25%',
    float: 'left',
    width: '150px',
    height: '150px'
  },
  itemText: {
    float: 'right',
    paddingLeft: '20px'
  }
}
const List = ({
  items = [],
  filtered,
  input = '',
  fetching = false,
  fetch,
  filter
}) => {
  const _items = (filtered || items).map((item) => {
    const fill = Math.random() > 0.5 ? 'red' : 'green';
    const status = Math.random() > 0.5 ? 'Unhealthy' : 'Healthy';

    return (
      <div style={styles.item} key={item.id}>
        <img style={styles.itemImage} src={item.image} alt={item.title} />
        <h3 style={styles.itemText}>{item.title}</h3>
        <h4 style={styles.itemText}>{status}</h4>
        <p style={styles.itemText}>{item.description}</p>
        <svg>
          <circle cx={50} cy={50} r={10} fill={fill} />
        </svg>
      </div>
    );
  });

  const _loading = (
    <div>
      Loading...
    </div>
  );

  const _filter = debounce(filter, 100);
  const onChange = (ev) => _filter(ev.target.value);

  return (
    <div>
      <input onChange={onChange} />
      <Infinite
        containerHeight={400}
        preloadBatchSize={1600}
        elementHeight={20}
        infiniteLoadBeginEdgeOffset={200}
        onInfiniteLoad={fetch}
        isInfiniteLoading={fetching}
        loadingSpinnerDelegate={_loading}
      >
        {_items}
      </Infinite>
    </div>
  );
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
