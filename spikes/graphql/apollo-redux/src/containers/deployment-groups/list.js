import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';

class DeploymentGroupList extends Component {

  render() {

    const {
      location,
      deploymentGroups,
      loading,
      error
    } = this.props;

    const deploymentGroupList =
      loading ? <p>Loading...</p> :
      error ? <p>Error!!!</p> :
      deploymentGroups.map((deploymentGroup, index) => {
        return (
          <p key={index}>
            <Link
              to={`${location.pathname}/${deploymentGroup.id}/services`}
            >
              {deploymentGroup.name}
            </Link>
          </p>)});

    return (
      <div>
        <div>
          <h2>Deployment Group List</h2>
        </div>
        { deploymentGroupList }
      </div>
    );
  }
}

const deploymentGroups = gql`
  query {
    deploymentGroups {
      uuid
      name
      id
    }
  }
`;

const DeploymentGroupListWithData = graphql(deploymentGroups, {
  props: ({ data: { deploymentGroups, loading, error }}) => ({
    deploymentGroups,
    loading,
    error
  })
})(DeploymentGroupList);

export default DeploymentGroupListWithData;
