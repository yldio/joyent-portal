import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import InstancesQuery from '@graphql/Instances.gql';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';

import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { Loader, ErrorMessage } from '@components/messaging';
import { InstanceListItem, EmptyInstances } from '@components/instances';
import { toggleInstancesTooltip } from '@root/state/actions';
import { withNotFound, GqlPaths } from '@containers/navigation';

const InstanceList = ({
  deploymentGroup,
  instances = [],
  loading,
  error,
  instancesTooltip,
  toggleInstancesTooltip
}) => {

  const _title = <Title>Instances</Title>;

  if (loading && !forceArray(instances).length) {
    return (
      <LayoutContainer center>
        {_title}
        <Loader />
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        {_title}
        <ErrorMessage
          title="Ooops!"
          message="An error occurred while loading your instances."
        />
      </LayoutContainer>
    );
  }

  if (deploymentGroup.status === 'PROVISIONING' && !instances.length) {
    return (
      <LayoutContainer center>
        {_title}
        <Loader msg="Just a moment, we’re on it" />
      </LayoutContainer>
    );
  }

  const handleHealthMouseOver = (evt, instance) => {
    handleMouseOver(evt, instance, 'healthy');
  };

  const handleStatusMouseOver = (evt, instance) => {
    handleMouseOver(evt, instance, 'status');
  };

  const handleMouseOver = (evt, instance, type) => {

    const label = evt.currentTarget;
    const labelRect = label.getBoundingClientRect();
    const offset = type === 'healthy'
      ? 48 : type === 'status' ? 36 : 0;

    const position = {
      left:
        `${window.scrollX + labelRect.left + offset}px`,
      top: `${window.scrollY + labelRect.bottom}px`
    };

    const tooltipData = {
      instance,
      position,
      type
    }

    toggleInstancesTooltip(tooltipData);
  };

  const handleMouseOut = (evt) => {
    toggleInstancesTooltip({ show: false });
  };

  const instanceList = instances.map((instance, index) =>
    <InstanceListItem
      instance={instance}
      key={instance.id}
      toggleCollapsed={() => null}
      onHealthMouseOver={handleHealthMouseOver}
      onStatusMouseOver={handleStatusMouseOver}
      onMouseOut={handleMouseOut}
    />
  );

  const _instances = !instanceList.length ? <EmptyInstances /> : instanceList;

  return (
    <LayoutContainer>
      {_title}
      {_instances}
    </LayoutContainer>
  );
}

const mapStateToProps = (state, ownProps) => ({
  instancesTooltip: state.ui.instances.tooltip
});

const mapDispatchToProps = dispatch => ({
  toggleInstancesTooltip: data => dispatch(toggleInstancesTooltip(data))
});

const UiConnect = connect(mapStateToProps, mapDispatchToProps);

const InstanceListGql = graphql(InstancesQuery, {
  options(props) {
    const params = props.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;

    return {
      pollInterval: 1000,
      variables: {
        deploymentGroupSlug,
        serviceSlug
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error }}) => ({
    deploymentGroup,
    instances: sortBy(
      forceArray(
        deploymentGroup &&
          forceArray(deploymentGroup.services).reduce(
            (instances, service) => instances.concat(service.instances),
            []
          )
      ).filter(Boolean),
      ['name']
    ),
    loading,
    error
  })
});

export default compose(
  UiConnect,
  InstanceListGql,
  withNotFound([
    GqlPaths.DEPLOYMENT_GROUP,
    GqlPaths.SERVICES
  ])
)(InstanceList);
