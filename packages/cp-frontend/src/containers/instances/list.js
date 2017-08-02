import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';

import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { Loader, ErrorMessage } from '@components/messaging';
import { InstanceListItem, EmptyInstances } from '@components/instances';

const InstanceList = ({ deploymentGroup, instances = [], loading, error }) => {
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
          title='Ooops!'
          message='An error occured while loading your instances.' />
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

  const instanceList = instances.map((instance, index) =>
    <InstanceListItem
      instance={instance}
      key={instance.id}
      toggleCollapsed={() => null}
    />
  );

  const _instances = !instanceList.length ? <EmptyInstances /> : instanceList;

  return (
    <LayoutContainer>
      {_title}
      {_instances}
    </LayoutContainer>
  );
};

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
  props: ({ data: { deploymentGroup, loading, error } }) => ({
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

export default compose(InstanceListGql)(InstanceList);
