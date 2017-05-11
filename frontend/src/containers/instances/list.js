import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';

class InstanceList extends Component {

  render() {

    const {
      instances,
      loading,
      error
    } = this.props;

    const instanceList =
      loading ? <p>Loading...</p> :
      error ? <p>Error!!!</p> :
      instances.map((instance, index) =>
        <p key={index}>{instance.name}</p>);

    return (
      <div>
        <div>
          <h2>Instance List</h2>
        </div>
        { instanceList }
      </div>
    );
  }
}

const InstanceListWithData = graphql(InstancesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupId: props.match.params.deploymentGroup
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
})(InstanceList)

export default InstanceListWithData;
