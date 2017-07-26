import React, { Component } from 'react';
// Import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import { LayoutContainer } from '@components/layout';
import { ErrorMessage } from '@components/messaging';
import { InstanceListItem, EmptyInstances } from '@components/instances';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import { H2 } from 'joyent-ui-toolkit';

const Title = H2.extend`
  margin-top: ${remcalc(2)};
`;

class InstanceList extends Component {
  render() {
    const { instances, loading, error } = this.props;

    const _loading = !loading ? null : <DeploymentGroupsLoading />;

    const _error = !error
      ? null
      : <Row>
          <ErrorMessage message="Oops, and error occured while loading your instances." />
        </Row>;

    const instanceList = instances
      ? instances.map((instance, index) =>
          <InstanceListItem
            instance={instance}
            key={instance.id}
            toggleCollapsed={() => null}
          />
        )
      : <EmptyInstances />;

    return (
      <LayoutContainer>
        <Title>Instances</Title>
        {_error}
        {_loading}
        {instanceList}
      </LayoutContainer>
    );
  }
}

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
    instances:
      deploymentGroup && deploymentGroup.services
        ? deploymentGroup.services.reduce(
            (instances, service) => instances.concat(service.instances),
            []
          )
        : null,
    loading,
    error
  })
});

const InstanceListWithData = compose(InstanceListGql)(InstanceList);

export default InstanceListWithData;
