import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import titleCase from 'title-case';
import get from 'lodash.get';
import { set } from 'react-redux-values';
import sortBy from 'lodash.sortby';

import { PackageIcon, StatusLoader } from 'joyent-ui-toolkit';
import Package from '@components/create-instance/package';
import Title from '@components/create-instance/title';
import priceData from '../../data/prices.json';

import getPackages from '../../graphql/get-packages.gql';

const PackageContainer = ({
  expanded,
  vmSelected,
  handleSubmit,
  handleCancel,
  loading,
  packages,
  pkg,
  sortOrder,
  handleSortBy,
  sortBy
}) => (
  <Fragment>
    <Title icon={<PackageIcon />}>Package</Title>
    {loading && expanded ? (
      <StatusLoader />
    ) : (
      <ReduxForm
        form="create-instance-package"
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={handleSubmit}
      >
        {props => (
          <Package
            {...props}
            pkg={pkg}
            vmSelected={vmSelected}
            packages={packages}
            expanded={expanded}
            sortBy={sortBy}
            onCancel={handleCancel}
            sortOrder={sortOrder}
            onSortBy={handleSortBy}
          />
        )}
      </ReduxForm>
    )}
  </Fragment>
);

export default compose(
  withRouter,
  graphql(getPackages, {
    props: ({
      ownProps: { vmSelected = false },
      data: { loading, packages = [] }
    }) => ({
      loading,
      packages: packages.map(pkg => {
        const packagePrice = priceData.filter(p => p.name === pkg.name)[0];
        const packageName = pkg.name.replace(/-kvm/g, '').trim();

        return {
          ...pkg,
          ssd: pkg.name.includes('fastdisk'),
          vm: pkg.name.includes('kvm'),
          memory: pkg.memory * 1000000,
          disk: pkg.disk * 1000000,
          price: packagePrice.cost || 0,
          name: titleCase(packageName.replace(/-/g, ' ')),
          group: pkg.group.replace(/KVM/g, '').trim()
        };
      })
    })
  }),
  connect(
    (state, { packages, ...ownProps }) => {
      const _sortBy = get(state, 'values.packages-list-sort-by', 'name');
      const _sortOrder = get(state, 'values.packages-list-sort-order', 'asc');

      const sortedPackages = sortBy(packages, [_sortBy]);

      return {
        ...ownProps,
        sortBy: _sortBy,
        sortOrder: _sortOrder,
        packages:
          _sortOrder === 'asc' ? sortedPackages : sortedPackages.reverse(),
        vmSelected: get(state, 'form.create-instance-image.values.vms', false),
        pkg: get(state, 'form.create-instance-package.values.package', null)
      };
    },
    (dispatch, { history }) => ({
      handleSubmit: () => history.push(`/instances/~create/tags`),
      handleCancel: () => history.push(`/instances/~create/image`),
      handleSortBy: (newSortBy, sortOrder) => {
        dispatch([
          set({
            name: `packages-list-sort-order`,
            value: sortOrder === 'desc' ? 'asc' : 'desc'
          }),
          set({
            name: `packages-list-sort-by`,
            value: newSortBy
          })
        ]);
      }
    })
  )
)(PackageContainer);
