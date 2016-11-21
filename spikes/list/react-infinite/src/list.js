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

const List = ({
  items = [],
  filtered,
  input = '',
  fetching = false,
  fetch,
  filter
}) => {
  const _items = (filtered || items).map((item) => {
    return (
      <div key={item.id}>
        {item.title}
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
        containerHeight={200}
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
