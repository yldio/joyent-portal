import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { InstanceListItem, EmptyInstances } from '@components/instances';

class InstanceList extends Component {

  render() {

    const {
      instances,
      loading,
      error
    } = this.props;
    console.log('instances = ', instances);
    console.log('loading = ', loading);
    console.log('error = ', error);
    if(loading) {
      return (
        <LayoutContainer>
          <Loader />
        </LayoutContainer>
      )
    }
    else if(error) {
      return (
        <LayoutContainer>
          <ErrorMessage
            message='Oops, and error occured while loading your instances.'
          />
        </LayoutContainer>
      )
    }

    const instanceList = instances ? instances.map((instance, index) => (
        <InstanceListItem
          instance={instance}
          key={instance.uuid}
          toggleCollapsed={() => null}
        />
      )) : (
        <EmptyInstances />
      );

    return (
      <LayoutContainer>
        <div>
          <h2>Instance List</h2>
        </div>
        { instanceList }
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
      variables: {
          deploymentGroupSlug,
          serviceSlug
        }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    instances: deploymentGroup && deploymentGroup.services ?
      deploymentGroup.services.reduce((instances, service) =>
        instances.concat(service.instances), []) : null,
    loading,
    error
  })
});

const InstanceListWithData = compose(
  InstanceListGql
)(InstanceList);

export default InstanceListWithData;
