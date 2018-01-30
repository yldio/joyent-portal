import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import titleCase from 'title-case';
import get from 'lodash.get';
import { set } from 'react-redux-values';
import sortBy from 'lodash.sortby';
import find from 'lodash.find';
import includes from 'lodash.includes';
import reverse from 'lodash.reverse';
import constantCase from 'constant-case';
import { reset } from 'redux-form';

import { PackageIcon, StatusLoader } from 'joyent-ui-toolkit';
import {
  Filters,
  Packages,
  Package,
  Overview
} from '@components/create-instance/package';

import AnimatedWrapper from '@containers/create-instance/animatedWrapper';
import Title from '@components/create-instance/title';
import Description from '@components/description';
import getPackages from '@graphql/get-packages.gql';
import priceData from '@data/prices.json';

const FORM_NAME = 'create-instance-package';
const FILTERS = 'create-instance-package-filters';

const PackageContainer = ({
  expanded,
  hasVms,
  handleNext,
  handleEdit,
  loading,
  packages,
  selected = {},
  sortOrder,
  handleSortBy,
  sortBy,
  resetFilters,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !selected.id && handleEdit}
      icon={<PackageIcon />}
    >
      Package
    </Title>
    <div>
      {expanded ? (
        <Description>
          A package defines the specs of your instance. On Triton, packages can
          only increase in size.{' '}
          <a
            href="https://docs.joyent.com/private-cloud/packages"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs
          </a>
        </Description>
      ) : null}
      {!loading && expanded ? (
        <ReduxForm
          form={`${FORM_NAME}-filters`}
          destroyOnUnmount={false}
          forceUnregisterOnUnmount={true}
        >
          {props => <Filters {...props} resetFilters={resetFilters} />}
        </ReduxForm>
      ) : null}
      {loading && expanded ? (
        <StatusLoader />
      ) : (
        <ReduxForm
          form={FORM_NAME}
          destroyOnUnmount={false}
          forceUnregisterOnUnmount={true}
          onSubmit={handleNext}
        >
          {props => (
            <Fragment>
              {expanded ? (
                <Fragment>
                  <Packages
                    {...props}
                    hasVms={hasVms}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortBy={handleSortBy}
                    packages={packages.length}
                  >
                    {packages.map(({ id, ...pkg }) => (
                      <Package
                        key={id}
                        id={id}
                        selected={selected.id === id}
                        hasVms={hasVms}
                        {...pkg}
                      />
                    ))}
                  </Packages>
                </Fragment>
              ) : null}
              {!expanded && selected.id ? (
                <Overview {...selected} hasVms={hasVms} onCancel={handleEdit} />
              ) : null}
            </Fragment>
          )}
        </ReduxForm>
      )}
    </div>
  </Fragment>
);

export default compose(
  AnimatedWrapper,
  graphql(getPackages, {
    props: ({ data: { loading, packages = [] } }) => ({
      loading,
      packages: packages.map(pkg => {
        const packagePrice = priceData.filter(p => p.name === pkg.name)[0];
        const packageName = pkg.name.replace(/-kvm/g, '').trim();

        return {
          ...pkg,
          ssd: includes(pkg.name, 'fastdisk'),
          vm: includes(pkg.name, 'kvm'),
          memory: pkg.memory * 1000000,
          disk: pkg.disk * 1000000,
          price: packagePrice.cost || 0,
          name: titleCase(packageName.replace(/-/g, ' ')),
          group: constantCase(
            pkg.group.replace(/optimized|purpose|KVM/gi, '').trim()
          )
        };
      })
    })
  }),
  connect(
    ({ form, values }, { packages, ...ownProps }) => {
      const _sortBy = get(values, 'packages-list-sort-by', 'price');
      const _sortOrder = get(values, 'packages-list-sort-order', 'asc');

      const ssdOnly = get(form, `${FILTERS}.values.ssd`, false);
      const computeOptimized = get(
        form,
        `${FILTERS}.values.compute-optimized`,
        false
      );
      const generalPurpose = get(
        form,
        `${FILTERS}.values.general-purpose`,
        false
      );
      const storageOptimized = get(
        form,
        `${FILTERS}.values.storage-optimized`,
        false
      );
      const memoryOptimized = get(
        form,
        `${FILTERS}.values.memory-optimized`,
        false
      );
      const vmSelected = get(form, 'create-instance-image.values.vms', false);
      const pkgSelected = get(form, `${FORM_NAME}.values.package`, null);

      const sorted = sortBy(packages, [_sortBy]);

      let filtered = sorted
        .filter(p => (ssdOnly ? p.ssd === ssdOnly : true))
        .filter(p => p.vm === vmSelected);

      if (
        computeOptimized ||
        generalPurpose ||
        storageOptimized ||
        memoryOptimized
      ) {
        filtered = filtered.filter(
          p =>
            (memoryOptimized && p.group === 'MEMORY') ||
            (storageOptimized && p.group === 'STORAGE') ||
            (generalPurpose && p.group === 'GENERAL') ||
            (computeOptimized && p.group === 'COMPUTE')
        );
      }

      return {
        ...ownProps,
        sortBy: _sortBy,
        sortOrder: _sortOrder,
        packages: _sortOrder === 'asc' ? filtered : reverse(filtered),
        hasVms: vmSelected,
        selected: find(packages, ['id', pkgSelected])
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(
          set({ name: 'create-instance-package-proceeded', value: true })
        );

        return history.push('/instances/~create/tags');
      },
      handleEdit: () => history.push('/instances/~create/package'),
      resetFilters: () => {
        dispatch(reset(`${FILTERS}-filters`));
      },
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
