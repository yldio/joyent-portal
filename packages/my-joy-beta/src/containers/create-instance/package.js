import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

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
  packages
}) => (
  <Fragment>
    <Title icon={<PackageIcon />}>Package</Title>
    {loading ? (
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
            vmSelected={vmSelected}
            packages={packages}
            expanded={expanded}
            onCancel={handleCancel}
          />
        )}
      </ReduxForm>
    )}
  </Fragment>
);

export default compose(
  withRouter,
  connect(
    (state, ownProps) => {
      return {
        ...ownProps,
        vmSelected: get(state, 'form.create-instance-image.values.vms', false),
        image: get(state, 'form.create-instance-package.values.image', null)
      };
    },
    (dispatch, { history }) => ({
      handleSubmit: () => history.push(`/instances/~create/package`),
      handleCancel: () => history.push(`/instances/~create/image`)
    })
  ),
  graphql(getPackages, {
    props: ({
      ownProps: { vmSelected = false },
      data: { loading, packages = [] }
    }) => ({
      loading,
      packages: packages.reduce((accumulator, pkg) => {
        const isVm = pkg.name.includes('kvm');
        const packagePrice = priceData.filter(p => p.name === pkg.name)[0];

        const formattedPackage = {
          ...pkg,
          ssd: pkg.name.includes('fastdisk'),
          memory: pkg.memory * 1000000,
          disk: pkg.disk * 1000000,
          price: packagePrice.cost || 0
        };

        if (isVm && vmSelected) {
          return accumulator.concat({
            ...formattedPackage,
            group: pkg.group.replace(/KVM/g, '').trim(),
            name: pkg.name.replace(/-kvm/g, '').trim()
          });
        }

        if (!isVm && !vmSelected) {
          return accumulator.concat({
            ...formattedPackage
          });
        }

        return accumulator;
      }, [])
    })
  })
)(PackageContainer);
