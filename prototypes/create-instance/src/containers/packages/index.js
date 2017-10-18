import React from 'react';
import { connect } from 'react-redux';
// import { graphql } from 'react-apollo';
import { Packages } from '@components/packages';
// import packagesQuery from '@graphql/packages.gql';

const PackagesHOC = ({ packages, filters }) => (
  <Packages packages={packages} filters={filters} />
);

// const PackagesHOCWithData = graphql(packagesQuery, {
//   props: ({ data: { packages = [], loading = true } }) => ({
//     packages,
//     loading
//   })
// })(PackagesHOC);

const mapStateToProps = state => {
  return {
    packages: state.app.packages,
    filters: state.app.filters
  };
};

export default connect(mapStateToProps)(PackagesHOC);
