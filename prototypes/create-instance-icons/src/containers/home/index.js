import React from 'react';
import { connect } from 'react-redux';

import { ViewContainer } from 'joyent-ui-toolkit';

import { Home } from '@components/home';
import { changeFilters, resetFilters } from '../../state/actions';

const HomeHOC = props => (
  <ViewContainer main>
    <Home {...props} />
  </ViewContainer>
);

const mapStateToProps = state => {
  return {
    filters: state.app.filters,
    packages: state.app.packages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: filters => {
      dispatch(changeFilters(filters));
    },
    onFilterReset: () => {
      dispatch(resetFilters());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHOC);
