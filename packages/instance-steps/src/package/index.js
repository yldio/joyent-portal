import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { destroy, change } from 'redux-form';
import constantCase from 'constant-case';
import titleCase from 'title-case';
import sortBy from 'lodash.sortby';
import find from 'lodash.find';
import includes from 'lodash.includes';
import reverse from 'lodash.reverse';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { Button, PackageIcon, StatusLoader } from 'joyent-ui-toolkit';

import { Filters, Packages, Package, Overview } from './components';
import getPackages from '../graphql/get-packages.gql';
import priceData from './prices.json';
import { Forms, Values } from '../constants';

const { IC_PKG_F_SELECT, IC_PKG_F_FILTER } = Forms;

const { IC_PKG_V_SORT_BY, IC_PKG_V_SORT_ORDER, IC_IMG_V_VMS } = Values;

const PackageComponent = ({
  handleRowClick,
  handleSortBy,
  handleResetFilters,
  handleGetValue,
  sortBy,
  sortOrder,
  packages,
  loading,
  hasVms,
  selected = {},
  preview = {},
  ...props
}) => (
  <Step name="package" getValue={handleGetValue} {...props}>
    <StepHeader icon={<PackageIcon />}>Package</StepHeader>
    <StepDescription>
      A package defines the specs of your instance. On Triton, packages can only
      increase in size.
    </StepDescription>
    <StepPreview>
      <Margin top={3}>
        <Overview {...preview} />
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top={5}>
          <Margin>
            <ReduxForm
              form={IC_PKG_F_FILTER}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
            >
              {props =>
                loading ? null : (
                  <Filters {...props} onResetFilters={handleResetFilters} />
                )
              }
            </ReduxForm>
            <ReduxForm
              form={IC_PKG_F_SELECT}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              onSubmit={null}
            >
              {props =>
                loading ? (
                  <StatusLoader />
                ) : (
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
                          onRowClick={handleRowClick}
                          sortBy={sortBy}
                          {...pkg}
                        />
                      ))}
                    </Packages>
                    <Margin top="4">
                      <Button type="button" component={Link} to={next}>
                        Next
                      </Button>
                    </Margin>
                  </Fragment>
                )
              }
            </ReduxForm>
          </Margin>
        </Margin>
      )}
    </StepOutlet>
  </Step>
);

export default compose(
  graphql(getPackages, {
    options: () => ({
      ssr: false
    }),
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
    ({ form = {}, values, ...rest }, { packages, ...ownProps }) => {
      const _sortBy = get(values, IC_PKG_V_SORT_BY, 'price');
      const _sortOrder = get(values, IC_PKG_V_SORT_ORDER, 'asc');
      const ssdOnly = get(form, `${IC_PKG_F_FILTER}.values.ssd`, false);

      const computeOptimized = get(
        form,
        `${IC_PKG_F_FILTER}.values.compute-optimized`,
        false
      );

      const generalPurpose = get(
        form,
        `${IC_PKG_F_FILTER}.values.general-purpose`,
        false
      );

      const storageOptimized = get(
        form,
        `${IC_PKG_F_FILTER}.values.storage-optimized`,
        false
      );

      const memoryOptimized = get(
        form,
        `${IC_PKG_F_FILTER}.values.memory-optimized`,
        false
      );

      const vmSelected = get(values, IC_IMG_V_VMS, true);
      const pkgSelected = get(form, `${IC_PKG_F_SELECT}.values.package`, null);
      const selected = find(packages, ['id', pkgSelected]);

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
        selected,
        handleGetValue: () => selected
      };
    },
    (dispatch, { history }) => ({
      handleResetFilters: () => {
        dispatch(destroy(IC_PKG_F_FILTER));
      },
      handleRowClick: id => {
        dispatch(change(IC_PKG_F_SELECT, 'package', id));
      },
      handleSortBy: (newSortBy, sortOrder) => {
        dispatch([
          set({
            name: IC_PKG_V_SORT_ORDER,
            value: sortOrder === 'desc' ? 'asc' : 'desc'
          }),
          set({ name: IC_PKG_V_SORT_BY, value: newSortBy })
        ]);
      }
    })
  )
)(PackageComponent);
