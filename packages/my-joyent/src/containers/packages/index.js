import React from 'react';
import { connect } from 'react-redux';
// import { graphql } from 'react-apollo';
import { Packages } from '@components/packages';
// import packagesQuery from '@graphql/packages.gql';
import data from '../../data/packages';

const PackagesHOC = ({ packages, filters }) => (
  <Packages packages={data} filters={filters} />
);

// const PackagesHOCWithData = graphql(packagesQuery, {
//   props: ({ data: { packages = [], loading = true } }) => ({
//     packages,
//     loading
//   })
// })(PackagesHOC);

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(PackagesHOC);
