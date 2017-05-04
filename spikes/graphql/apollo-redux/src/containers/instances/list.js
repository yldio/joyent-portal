import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class InstanceList extends Component {

  render() {

    console.log('this.props = ', this.props);

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
  query Instances($deploymentGroupUuid: String!){
    deploymentGroup(uuid: $deploymentGroupUuid) {
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
        deploymentGroupUuid: props.match.params.project
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
