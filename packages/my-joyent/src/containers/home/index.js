import React from 'react';
import { connect } from 'react-redux';
import { changeFilters, resetFilters } from '../../state/actions';
import { LayoutContainer } from '@components/layout';
import { Home } from '@components/home';

const HomeHOC = (props) => (
  <LayoutContainer>
    <Home
      {...props}
    />
  </LayoutContainer>
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
