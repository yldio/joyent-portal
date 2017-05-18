const ReactRedux = require('react-redux');
const actions = require('./actions');
const React = require('react');
const users = require('../../users');

import fuzzyFilterFactory from 'react-fuzzy-filter';

// these components share state and can even live in different components
const {InputFilter, FilterResults} = fuzzyFilterFactory();

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

const Search = React.createClass({

  renderItem: function(item, index) {
    return(<div key={index}>{item.name}</div>);
  },

  render: function() {
    const fuseConfig = {
      keys: ['meta', 'tag']
    };
    return (
      <div>
        <InputFilter />
        <div>Any amount of content between</div>
        <FilterResults
          items={users}
          renderItem={this.renderItem}
          fuseConfig={fuseConfig}
        />
      </div>
    );
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
