import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { destroy, change } from 'redux-form';
import { connect } from 'react-redux';
import titleCase from 'title-case';
import get from 'lodash.get';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import sortBy from 'lodash.sortby';
import find from 'lodash.find';
import includes from 'lodash.includes';
import reverse from 'lodash.reverse';
import constantCase from 'constant-case';

import { PackageIcon, StatusLoader, Button } from 'joyent-ui-toolkit';

import {
  Filters,
  Packages,
  Package,
  Overview
} from '@components/create-instance/package';

import Title from '@components/create-instance/title';
import Description from '@components/description';
import getPackages from '@graphql/get-packages.gql';
import priceData from '@data/prices.json';
import { Forms, Values } from '@root/constants';

const { IC_PKG_F_SELECT, IC_PKG_F_FILTER } = Forms;

const {
  IC_PKG_V_PROCEEDED,
  IC_PKG_V_SORT_BY,
  IC_PKG_V_SORT_ORDER,
  IC_IMG_V_VMS
} = Values;

const PackageContainer = ({
  expanded,
  proceeded,
  hasVms,
  handleNext,
  handleEdit,
  loading,
  packages,
  selected = {},
  sortOrder,
  sortBy,
  handleRowClick,
  handleResetFilters,
  handleSortBy,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<PackageIcon />}
    >
      Package
    </Title>
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
    <ReduxForm
      form={IC_PKG_F_FILTER}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
    >
      {props =>
        !loading && expanded ? (
          <Filters {...props} onResetFilters={handleResetFilters} />
        ) : null
      }
    </ReduxForm>
    <ReduxForm
      form={IC_PKG_F_SELECT}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleNext}
    >
      {props =>
        expanded ? (
          loading ? (
            <StatusLoader />
          ) : (
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
          )
        ) : selected.id ? (
          <Overview {...selected} hasVms={hasVms} onCancel={handleEdit} />
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      !loading ? (
        <Margin top={4} bottom={7}>
          <Button type="button" onClick={handleNext} disabled={!selected.id}>
            Next
          </Button>
        </Margin>
      ) : null
    ) : proceeded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
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
    ({ form, values }, { packages, ...ownProps }) => {
      const proceeded = get(values, IC_PKG_V_PROCEEDED, false);
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
        proceeded: proceeded || selected
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_PKG_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/tags${history.location.search}`
        );
      },
      handleEdit: () => {
        return history.push(
          `/instances/~create/package${history.location.search}`
        );
      },
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
)(PackageContainer);
