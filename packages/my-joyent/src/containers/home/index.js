import React from 'react';
import { connect } from 'react-redux';
import changeFilters from '../../state/actions';
import { LayoutContainer } from '@components/layout';
import { Home } from '@components/home';

const HomeHOC = ({ filters, onFilterChange }) => (
  <LayoutContainer>
    <Home filters={filters} onFilterChange={onFilterChange} />
  </LayoutContainer>
);

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: filters => {
      dispatch(changeFilters(filters));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHOC);
