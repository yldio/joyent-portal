import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

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

const instances = gql`
  query Instances($deploymentGroupId: String!){
    deploymentGroup(id: $deploymentGroupId) {
      services {
        instances {
          uuid
          name
        }
      }
    }
  }
`;

const InstanceListWithData = graphql(instances, {
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
