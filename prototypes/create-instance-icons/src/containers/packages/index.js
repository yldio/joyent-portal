import React from 'react';
import { connect } from 'react-redux';
import { Packages } from '@components/packages';

const PackagesHOC = ({ packages, filters, type }) => (
  <Packages packages={packages} filters={filters} groups={type} />
);

const mapStateToProps = state => {
  return {
    packages: state.app.packages,
    filters: state.app.filters,
    type: state.form.type.values
  };
};

export default connect(mapStateToProps)(PackagesHOC);
